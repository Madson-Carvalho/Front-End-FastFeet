import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import statusPackage from "../../utils/statusPackage";
import CustomSelect from "../../component/customSelect/CustomSelect";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from 'react-toastify';
import formatDataToInput from "../../utils/formatDataToInput";

const PackageRegistration = () => {
    const { id } = useParams();
    const isEditMode = !!id;

    const [userData, setUserData] = useState({
        // recipient: "",
        deliveryMan: "",
        requestDate: "",
        previusRequestDate: "",
        deliveryDate: "",
        status: "",
        deliveryAddress: "",
        uf: "",
        city: ""
    });

    const postEndpoint = 'http://localhost:3333/api/v1/packages/create'
    const token = localStorage.getItem('authToken');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userData.uf}/municipios`;

    const ufs = [
        {name: 'Acre', value: 'AC'},
        {name: 'Alagoas', value: 'AL'},
        {name: 'Amapá', value: 'AP'},
        {name: 'Amazonas', value: 'AM'},
        {name: 'Bahia', value: 'BA'},
        {name: 'Ceará', value: 'CE'},
        {name: 'Distrito Federal', value: 'DF'},
        {name: 'Espírito Santo', value: 'ES'},
        {name: 'Goiás', value: 'GO'},
        {name: 'Maranhão', value: 'MA'},
        {name: 'Mato Grosso', value: 'MT'},
        {name: 'Mato Grosso do Sul', value: 'MS'},
        {name: 'Minas Gerais', value: 'MG'},
        {name: 'Pará', value: 'PA'},
        {name: 'Paraíba', value: 'PB'},
        {name: 'Paraná', value: 'PR'},
        {name: 'Pernambuco', value: 'PE'},
        {name: 'Piauí', value: 'PI'},
        {name: 'Rio de Janeiro', value: 'RJ'},
        {name: 'Rio Grande do Norte', value: 'RN'},
        {name: 'Rio Grande do Sul', value: 'RS'},
        {name: 'Rondônia', value: 'RO'},
        {name: 'Roraima', value: 'RR'},
        {name: 'Santa Catarina', value: 'SC'},
        {name: 'São Paulo', value: 'SP'},
        {name: 'Sergipe', value: 'SE'},
        {name: 'Tocantins', value: 'TO'}
    ];

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            // recipient: userData.recipient,
            deliveryMan: userData.deliveryMan,
            requestDate: new Date(userData.requestDate),
            previusRequestDate: new Date(userData.previusRequestDate),
            deliveryDate: new Date(userData.deliveryDate),
            status: userData.status,
            deliveryAddress: `${userData.deliveryAddress}, ${userData.city} - ${userData.uf.toUpperCase()}`
        }

        fetch(postEndpoint, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Encomenda cadastrada com sucesso!");
                    setTimeout(() => {
                        navigate('/packages');
                    }, 3000);
                } else {
                    throw new Error('Erro ao cadastrar encomenda');
                }
            })
            .catch(e => toast.error(e.message));
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const mappedCities = data.map(x => {
                    const nome = x.nome;
                    return {name: nome, value: nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};
                });
                setCities(mappedCities);
            })
            .catch(error => console.error('Erro ao buscar municípios:', error));
    }, [userData.uf]);

    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:3333/api/v1/packages/find-by-id/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserData({
                        deliveryMan: data.deliveryMan,
                        requestDate: formatDataToInput(data.requestDate),
                        previusRequestDate: formatDataToInput(data.previusRequestDate),
                        deliveryDate: formatDataToInput(data.deliveryDate),
                        status: data.status,
                        deliveryAddress: data.deliveryAddress.replace("-",",").split(",")[0],
                        uf: data.deliveryAddress.replace("-",",").split(",")[2].trim(),
                        city: data.deliveryAddress.replace("-",",").split(",")[1].trim()

                    });
                })
                .catch(error => console.error('Erro ao buscar usuário:', error));
        }
    }, [id, isEditMode]);

    return (

        <>
            <Header/>
            <Main title="Cadastro de Encomenda">
                <form className='base-form' onSubmit={handleSubmit}>
                    {/*<CustomInput id='recipient' type='text' name='recipient' label='Destinatário' placeholder=" " value={userData.recipient}*/}
                    {/*    onChange={handleChange} />*/}
                    <CustomInput id='deliveryMan' type='text' name='deliveryMan' label='Entregador' placeholder=" "
                                 value={userData.deliveryMan}
                                 onChange={handleChange}/>
                    <CustomInput id='requestDate' type='datetime-local' name='requestDate' label='Data do Pedido'
                                 placeholder=" " required={true} value={userData.requestDate}
                                 onChange={handleChange}/>
                    <CustomInput id='previusRequestDate' type='datetime-local' name='previusRequestDate'
                                 label='Data prevista para entrega' placeholder=" " required={true}
                                 value={userData.previusRequestDate}
                                 onChange={handleChange}/>
                    <CustomInput id='deliveryDate' type='datetime-local' name='deliveryDate'
                                 label='Data para realizar entrega' placeholder=" " required={true}
                                 value={userData.deliveryDate}
                                 onChange={handleChange}/>
                    <CustomSelect id='status' name='status' label='Status da encomenda' options={statusPackage}
                                  required={true} value={userData.status}
                                  onChange={handleChange}/>
                    <CustomInput id='deliveryAddress' type='text' name='deliveryAddress' label='Endereço'
                                 placeholder=" " required={true} value={userData.deliveryAddress}
                                 onChange={handleChange}/>
                    <CustomSelect id='uf' name='uf' label='Estado' options={ufs} required={true} value={userData.uf}
                                  onChange={handleChange}/>
                    <CustomSelect id='city' name='city' label='Cidade' options={cities} required={true}
                                  value={userData.city}
                                  onChange={handleChange}/>
                    <CustomInputSubmit value='Salvar'/>
                </form>
            </Main>
            <Footer/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default PackageRegistration;