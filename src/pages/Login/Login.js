import './Login.css';
import CustomInputSubmit from "../../component/customInputSubmit/CustomInputSubmit";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import logoImg from '../../assets/image/logo.png';
import papa from '../../assets/image/papaleguas-removebg-preview.png';
import CustomInput from "../../component/CustomInput/CustomInput";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const endpoint = "http://localhost:3333/api/v1/auth/login";

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            email: userData.email,
            password: userData.password,
        }


        fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        })
            .then(response => response.json())
            .then(response => {
                const token = response.token;
                localStorage.setItem('authToken', token);
                navigate('/users');
            })
            .catch(e => console.error(`usuário ou senha incorretos`, e))
    }

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
                        <form onSubmit={handleSubmit}>
                            <CustomInput id="email" type="text" name="email" label="E-mail" placeholder=" " onChange={handleChange} required={true}/>
                            <CustomInput id="password" label="Senha" type="password" name="password" placeholder=" " onChange={handleChange} required={true}/>
                            <CustomInputSubmit value={'Entrar'} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
