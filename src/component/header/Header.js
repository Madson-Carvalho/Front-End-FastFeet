import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faUserPlus, faLocationDot, faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/logo-removebg-preview.png";

const Header = () => {
    return (
        <header>
            <Link to={'/'}><img src={logo}/></Link>
            <nav>
                <Link to={'/'} title="Home"><FontAwesomeIcon icon={faHome} inverse/> home</Link>
                <Link to={'/users'}><FontAwesomeIcon icon={faUser} inverse/> usuário</Link>
                <Link to={'/packages'}><FontAwesomeIcon icon={faBoxOpen} inverse/> Encomenda</Link>
                <Link to={'/list-recipient'}><FontAwesomeIcon icon={faLocationDot} inverse/> destinatário</Link>
            </nav>
        </header>
    )
}

export default Header;