import './Login.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import logoImg from '../../assets/image/logo.png';
import papa from '../../assets/image/papaleguas-removebg-preview.png';
import CustomInput from "../../component/CustomInput/CustomInput";

const Login = () => {
    return (
        <>
            <div className="login">
                <div id="idImagem">
                    <span>
                    <img id="logo" src={logoImg} alt="Logo"/>
                    <h5>Entregas em um piscar de olhos</h5>
                    </span>
                    <img id="papa" src={papa}/>
                </div>
                <div className="login_conteiner">
                    <div>
                        <FontAwesomeIcon icon={faCircleUser}/>
                        <form>
                            <CustomInput id="cpf" type="text" name="cpf" label="CPF" placeholder=" "/>
                            <CustomInput id="password" label="Senha" type="password" name="password" placeholder=" "/>
                            <Link to="/" id="idlogin">Entrar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
