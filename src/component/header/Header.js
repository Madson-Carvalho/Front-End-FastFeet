import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <header>
            <nav>
                <a href={'#'}><FontAwesomeIcon icon={faHome}/></a>
            </nav>
        </header>
    )
}

export default Header;