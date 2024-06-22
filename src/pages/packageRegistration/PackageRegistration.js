import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import CustomInput from "../../component/CustomInput/CustomInput";
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import statusPackage from "../../utils/statusPackage";


const PackageRegistration = () => {
    return (
        <> 
            <Header />
            <Main title="Cadastro de Encomenda">
                <form className= 'base-form'>
                    <CustomInput id='recipient' type='text' name='recipient' label='Destinatário' placeholder=" "/>
                    <CustomInput id='deliveryMan' type='text' name='deliveryMan' label='Entregador' placeholder=" "/>
                    <CustomInput id='orderDate' type='date' name='orderDate' label='Data do Pedido' placeholder=" "/>
                    <CustomInput id='expectedDate' type='date' name='expectedDate' label='Data prevista para entrega' placeholder=" "/>
                    <CustomInput id='deliveryDate' type='date' name='deliveryDate' label='Data para realizar entrega' placeholder=" "/>
                    <CustomSelect id='status' name='status' label='Status da encomenda' options={statusPackage} required={true}/>
                    <CustomInput id='address' type='text' name='address' label='Endereço' placeholder=" "/>
                    <CustomInputSubmit value='Salvar' />
                </form>
            </Main>
            <Footer />
        </>


    )
}

export default PackageRegistration;