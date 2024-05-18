import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer>
            <p>Privacy Policy | Terms of service | &copy; FastFeet. All rights reserved.</p>
            <p><FontAwesomeIcon icon={faPhone}/> Telefone: 48 9999-8888</p>
            <p><FontAwesomeIcon icon={faEnvelope}/> E-mail: email@FastFeet.com</p>
        </footer>
    );
};

export default Footer;