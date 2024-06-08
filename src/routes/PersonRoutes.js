import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/notFound/NotFound";
import RegisterUser from "../pages/registerUser/RegisterUser";
import Login from "../pages/Login/Login";
import ListUser from "../pages/listUser/ListUser";
import RegisterRecipient from "../pages/registerRecipient/RegisterRecipient";
import ListRecipient from "../pages/listRecipient/ListRecipient";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/create-user'} element={<RegisterUser/>}/>
            <Route path='/users' element={<ListUser/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register-recipient'} element={<RegisterRecipient/>}/>
            <Route path={'/list-recipient'} element={<ListRecipient/>}/>
        </Routes>
    )
}

export default PersonRoutes;