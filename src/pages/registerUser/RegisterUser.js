import './RegisterUser.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomSelect from "../../component/customSelect/CustomSelect";
import accessPerfil from "../../utils/accessPerfil";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import {useEffect, useState} from "react";

const RegisterUser = () => {
    const [uf, setUf] = useState("");
    const [cities, setCities] = useState([]);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
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
        setUf(event.target.value);
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
    }, [uf]);

    return (
        <>
            <Header/>
            <Main title="Criar usuário">
                <form className='base-form'>
                    <CustomInput id='name' type='text' name='name' label='Nome' placeholder=" "/>
                    <CustomInput id='cpf' type='text' name='cpf' label='CPF' placeholder=" "/>
                    <CustomInput id='email' type='email' name='email' label='E-mail' placeholder=" "/>
                    <CustomInput id='password' type='password' name='password' label='Senha' placeholder=" "/>
                    <CustomInput id='address' type='text' name='address' label='Endereço' placeholder=" "/>
                    <CustomSelect id='uf' name='uf' label='Estado' options={ufs} onChange={handleChange}/>
                    <CustomSelect id='city' name='city' label='Cidade' options={cities}/>
                    <CustomInput id='phone' type='phone' name='phone' label='Telefone' placeholder=" "/>
                    <CustomSelect id='perfil' name='perfil' label='Perfil' options={accessPerfil}/>
                    <CustomInputSubmit value='Salvar'/>
                </form>
            </Main>
            <Footer/>
        </>
    )
}

export default RegisterUser;