import './NotFound.css'
import image from '../../assets/image/notFound.jpg';
import Header from "../../component/header/Header";

const NotFound = () => {
    return (
        <section className="not-found-page">
            <Header/>
            <img className="not-found" src={image}/>
        </section>
    )
}

export default NotFound;