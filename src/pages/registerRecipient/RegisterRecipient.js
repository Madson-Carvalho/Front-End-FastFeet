import './RegisterRecipient.css'
import Header from "../../component/header/Header";
import Main from '../../component/main/Main';
import CustomInput from '../../component/CustomInput/CustomInput';
import Footer from '../../component/footer/Footer';
import CustomInputSubmit from '../../component/customInputSubmit/CustomInputSubmit';


const RegisterRecipient = () => {
    return (
        <> 
            <Header />
            <Main title="Cadastro de Destinatário">
                <form className= 'base-form'>
                    <CustomInput id='name' type='text' name='name' label='Nome' placeholder=" "/>
                    <CustomInput id='cpf' type='text' name='cpf' label='CPF' placeholder=" "/>
                    <CustomInput id='phone' type='phone' name='phone' label='Telefone' placeholder=" "/>
                    <CustomInput id='email' type='email' name='email' label='E-mail' placeholder=" "/>
                    <CustomInput id='address' type='text' name='address' label='Endereço' placeholder=" "/>
                    <CustomInputSubmit value='Salvar' />
                </form>
            </Main>
            <Footer />
        </>


    )
}

export default RegisterRecipient;