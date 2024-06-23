import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import statusPackage from "../../utils/statusPackage";
import CustomSelect from "../../component/customSelect/CustomSelect";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import formatDataToInput from "../../utils/formatDataToInput";

const PackageRegistration = () => {
    const { id } = useParams();
    const isEditMode = !!id;

    const [packageData, setPackageData
    ] = useState({
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

    const postEndpoint = isEditMode ? `http://localhost:3333/api/v1/packages/edit/${id}` : 'http://localhost:3333/api/v1/packages/create'

    const token = localStorage.getItem('authToken');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${packageData.uf}/municipios`;

    const ufs = [
        { name: 'Acre', value: 'AC' },
        { name: 'Alagoas', value: 'AL' },
        { name: 'Amapá', value: 'AP' },
        { name: 'Amazonas', value: 'AM' },
        { name: 'Bahia', value: 'BA' },
        { name: 'Ceará', value: 'CE' },
        { name: 'Distrito Federal', value: 'DF' },
        { name: 'Espírito Santo', value: 'ES' },
        { name: 'Goiás', value: 'GO' },
        { name: 'Maranhão', value: 'MA' },
        { name: 'Mato Grosso', value: 'MT' },
        { name: 'Mato Grosso do Sul', value: 'MS' },
        { name: 'Minas Gerais', value: 'MG' },
        { name: 'Pará', value: 'PA' },
        { name: 'Paraíba', value: 'PB' },
        { name: 'Paraná', value: 'PR' },
        { name: 'Pernambuco', value: 'PE' },
        { name: 'Piauí', value: 'PI' },
        { name: 'Rio de Janeiro', value: 'RJ' },
        { name: 'Rio Grande do Norte', value: 'RN' },
        { name: 'Rio Grande do Sul', value: 'RS' },
        { name: 'Rondônia', value: 'RO' },
        { name: 'Roraima', value: 'RR' },
        { name: 'Santa Catarina', value: 'SC' },
        { name: 'São Paulo', value: 'SP' },
        { name: 'Sergipe', value: 'SE' },
        { name: 'Tocantins', value: 'TO' }
    ];

    const handleChange = (event) => {
        setPackageData({ ...packageData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            // recipient: userData.recipient,
            deliveryMan: packageData.deliveryMan,
            requestDate: new Date(packageData.requestDate),
            previusRequestDate: new Date(packageData.previusRequestDate),
            deliveryDate: new Date(packageData.deliveryDate),
            status: packageData.status,
            deliveryAddress: `${packageData.deliveryAddress}, ${packageData.city} - ${packageData.uf.toUpperCase()}`
        }

        const method = isEditMode ? 'PUT' : 'POST';

        fetch(postEndpoint, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => {
                if (response.ok) {
                    const action = isEditMode ? 'atualizado' : 'cadastrado';
                    toast.success(`Encomenda ${action} com sucesso!`);
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
                    return { name: nome, value: nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "") };
                });
                setCities(mappedCities);
            })
            .catch(error => console.error('Erro ao buscar municípios:', error));
    }, [packageData.uf]);

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
                    setPackageData({
                        deliveryMan: data.deliveryMan,
                        requestDate: formatDataToInput(data.requestDate),
                        previusRequestDate: formatDataToInput(data.previusRequestDate),
                        deliveryDate: formatDataToInput(data.deliveryDate),
                        status: data.status,
                        deliveryAddress: data.deliveryAddress.replace("-", ",").split(",")[0],
                        uf: data.deliveryAddress.replace("-", ",").split(",")[2].trim(),
                        city: data.deliveryAddress.replace("-", ",").split(",")[1].trim()

                    });
                })
                .catch(error => console.error('Erro ao buscar usuário:', error));
        }
    }, [id, isEditMode]);

    return (

        <>
            <Header />
            <Main title={isEditMode ? "Editar Encomenda" : "Cadastro de Encomenda"}>
                <form className='base-form' onSubmit={handleSubmit}>
                    {/*<CustomInput id='recipient' type='text' name='recipient' label='Destinatário' placeholder=" " value={userData.recipient}*/}
                    {/*    onChange={handleChange} />*/}
                    <CustomInput id='deliveryMan' type='text' name='deliveryMan' label='Entregador' placeholder=" "
                        value={packageData.deliveryMan}
                        onChange={handleChange} />
                    <CustomInput id='requestDate' type='datetime-local' name='requestDate' label='Data do Pedido'
                        placeholder=" " required={true} value={packageData.requestDate}
                        onChange={handleChange} />
                    <CustomInput id='previusRequestDate' type='datetime-local' name='previusRequestDate'
                        label='Data prevista para entrega' placeholder=" " required={true}
                        value={packageData.previusRequestDate}
                        onChange={handleChange} />
                    <CustomInput id='deliveryDate' type='datetime-local' name='deliveryDate'
                        label='Data para realizar entrega' placeholder=" " required={true}
                        value={packageData.deliveryDate}
                        onChange={handleChange} />
                    <CustomSelect id='status' name='status' label='Status da encomenda' options={statusPackage}
                        required={true} value={packageData.status}
                        onChange={handleChange} />
                    <CustomInput id='deliveryAddress' type='text' name='deliveryAddress' label='Endereço'
                        placeholder=" " required={true} value={packageData.deliveryAddress}
                        onChange={handleChange} />
                    <CustomSelect id='uf' name='uf' label='Estado' options={ufs} required={true} value={packageData.uf}
                        onChange={handleChange} />
                    <CustomSelect id='city' name='city' label='Cidade' options={cities} required={true}
                        value={packageData.city}
                        onChange={handleChange} />
                    <CustomInputSubmit value={isEditMode ? 'Atualizar' : 'Salvar'} />
                </form>
            </Main>
            <Footer />
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