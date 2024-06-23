import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/notFound/NotFound";
import RegisterUser from "../pages/registerUser/RegisterUser";
import Login from "../pages/Login/Login";
import ListUser from "../pages/listUser/ListUser";
import RegisterRecipient from "../pages/registerRecipient/RegisterRecipient";
import ListRecipient from "../pages/listRecipient/ListRecipient";
import PackageList from "../pages/packageList/PackageList";
import PackageRegistration from "../pages/packageRegistration/PackageRegistration";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/create-user'} element={<RegisterUser/>}/>
            <Route path={'/edit-user/:id'} element={<RegisterUser/>}/>
            <Route path='/users' element={<ListUser/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register-recipient'} element={<RegisterRecipient/>}/>
            <Route path={'/list-recipient'} element={<ListRecipient/>}/>
            <Route path="/packages" element= {<PackageList/>}/>
            <Route path="/package-registration" element= {<PackageRegistration/>}/>
        </Routes>
    )
}

export default PersonRoutes;