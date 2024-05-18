import './RegisterUser.css';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomSelect from "../../component/customSelect/CustomSelect";
import accessPerfil from "../../utils/accessPerfil";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";

const RegisterUser = () => {
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
                    <CustomInput id='phone' type='phone' name='phone' label='Telefone' placeholder=" "/>
                    <CustomSelect id='perfil' name='perfil' label='Perfil' options={accessPerfil}/>
                    <CustomInputSubmit value='Salvar' />
                </form>
            </Main>
            <Footer/>
        </>
    )
}

export default RegisterUser;