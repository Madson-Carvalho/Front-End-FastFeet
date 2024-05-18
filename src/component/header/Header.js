import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/logo-removebg-preview.png";

const Header = () => {
    return (
        <header>
            <img src={logo} />
            <nav>
                <a href={'#'}><FontAwesomeIcon icon={faHome} inverse size="lg" /></a>
            </nav>
        </header>
    )
}

export default Header;