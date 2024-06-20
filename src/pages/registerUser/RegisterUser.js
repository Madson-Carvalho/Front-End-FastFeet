import './RegisterUser.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomSelect from "../../component/customSelect/CustomSelect";
import accessPerfil from "../../utils/accessPerfil";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {
    const [userData, setUserData] = useState({
        name: "",
        cpf: "",
        email: "",
        password: "",
        address: "",
        uf: "",
        city: "",
        phone: "",
        perfil: ""
    });

    const [cities, setCities] = useState([]);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userData.uf}/municipios`;
    const postEndpoint = `http://localhost:3333/api/v1/users/create`;
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

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            name: userData.name,
            email: userData.email,
            cpf: userData.cpf,
            password: userData.password,
            perfil: userData.perfil,
            phone: userData.phone,
            address: `${userData.address}, ${userData.city} - ${userData.uf.toUpperCase()}`
        }
        fetch(postEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => {
                toast.success("Usuário cadastrado com sucesso!");
                setTimeout(() => {
                    navigate('/users');
                }, 3000);
            })
            .catch(e => toast.error('Erro ao cadastrar usuário', e))
    }

    return (
        <>
            <Header/>
            <Main title="Criar usuário">
                <form className='base-form' onSubmit={handleSubmit}>
                    <CustomInput id='name' type='text' name='name' label='Nome' placeholder=" " onChange={handleChange}
                                 required={true}/>
                    <CustomInput id='cpf' type='text' name='cpf' label='CPF' placeholder=" " onChange={handleChange}
                                 required={true}/>
                    <CustomInput id='email' type='email' name='email' label='E-mail' placeholder=" "
                                 onChange={handleChange} required={true}/>
                    <CustomInput id='password' type='password' name='password' label='Senha' placeholder=" "
                                 onChange={handleChange}
                                 required={true}/>
                    <CustomInput id='address' type='text' name='address' label='Endereço' placeholder=" "
                                 onChange={handleChange}
                                 required={true}/>
                    <CustomSelect id='uf' name='uf' label='Estado' options={ufs} onChange={handleChange}
                                  required={true}/>
                    <CustomSelect id='city' name='city' label='Cidade' options={cities} onChange={handleChange}
                                  required={true}/>
                    <CustomInput id='phone' type='phone' name='phone' label='Telefone' placeholder=" "
                                 onChange={handleChange}/>
                    <CustomSelect id='perfil' name='perfil' label='Perfil' options={accessPerfil}
                                  onChange={handleChange} required={true}/>
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

export default RegisterUser;