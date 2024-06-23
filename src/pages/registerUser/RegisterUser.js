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
import {useNavigate, useParams} from "react-router-dom";

const RegisterUser = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

    
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

    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:3333/api/v1/users/find-by-id/${id}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserData({
                    name: data.name,
                    cpf: data.cpf,
                    email: data.email,
                    address: data.address.replace("-", ",").split(",")[0].trim(),
                    uf: data.address.replace("-", ",").split(",")[2].trim(),
                    city: data.address.replace("-", ",").split(",")[1].trim(),
                    phone: data.phone,
                    perfil: data.perfil
                });
            })
            .catch(error => console.error('Erro ao buscar usuário:', error));
        }
    }, [id, isEditMode]);

    const [cities, setCities] = useState([]);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userData.uf}/municipios`;

    const postEndpoint = isEditMode ? `http://localhost:3333/api/v1/users/edit/${id}` : 'http://localhost:3333/api/v1/users/create';

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

        const method = isEditMode ? 'PUT' : 'POST';

        fetch(postEndpoint, {
            method: method,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => {
                const action = isEditMode ? 'atualizado' : 'cadastrado';
                toast.success(`Usuário ${action} com sucesso!`);
                setTimeout(() => {
                    navigate('/users');
                }, 3000);
            })
            .catch(e => toast.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} usuário`, e))
    }

    return (
        <>
            <Header />
            <Main title={isEditMode ? "Editar usuário" : "Criar usuário"}>
                <form className='base-form' onSubmit={handleSubmit}>
                    <CustomInput id='name' type='text' name='name' label='Nome' placeholder=" " value={userData.name} onChange={handleChange} required={true} />
                    <CustomInput id='cpf' type='text' name='cpf' label='CPF' placeholder=" " value={userData.cpf} onChange={handleChange} required={true} />
                    <CustomInput id='email' type='email' name='email' label='E-mail' placeholder=" " value={userData.email} onChange={handleChange} required={true} />
                    {!isEditMode && (
                        <CustomInput id='password' type='password' name='password' label='Senha' placeholder=" " value={userData.password} onChange={handleChange} required={true} />
                    )}
                    <CustomInput id='address' type='text' name='address' label='Endereço' placeholder=" " value={userData.address} onChange={handleChange} required={true} />
                    <CustomSelect id='uf' name='uf' label='Estado' options={ufs} value={userData.uf} onChange={handleChange} required={true} />
                    <CustomSelect id='city' name='city' label='Cidade' options={cities} value={userData.city} onChange={handleChange} required={true} />
                    <CustomInput id='phone' type='phone' name='phone' label='Telefone' placeholder=" " value={userData.phone} onChange={handleChange} />
                    <CustomSelect id='perfil' name='perfil' label='Perfil' options={accessPerfil} value={userData.perfil} onChange={handleChange} required={true} />
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

export default RegisterUser;