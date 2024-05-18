import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/logo-removebg-preview.png";

const Header = () => {
    return (
        <header>
            <Link to={'/'}><img src={logo} /></Link>
            <nav>
                <Link to={'/'}><FontAwesomeIcon icon={faHome} inverse size="lg" /></Link>
            </nav>
        </header>
    )
}

export default Header;