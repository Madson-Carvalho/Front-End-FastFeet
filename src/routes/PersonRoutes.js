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
import ProtectedRoute from "./ProtectedRoute";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
            <Route path={'/create-user'} element={<ProtectedRoute> <RegisterUser/> </ProtectedRoute>}/>
            <Route path={'/edit-user/:id'} element={<ProtectedRoute> <RegisterUser/> </ProtectedRoute>}/>
            <Route path='/users' element={<ProtectedRoute> <ListUser/> </ProtectedRoute>}/>
            <Route path='*' element={<ProtectedRoute> <NotFound/> </ProtectedRoute>}/>
            <Route path={'/register-recipient'} element={<ProtectedRoute> <RegisterRecipient/> </ProtectedRoute>}/>
            <Route path={'/edit-recipient/:id'} element={<ProtectedRoute> <RegisterRecipient/> </ProtectedRoute>}/>
            <Route path={'/list-recipient'} element={<ProtectedRoute> <ListRecipient/> </ProtectedRoute>}/>
            <Route path={'/packages'} element= {<ProtectedRoute> <PackageList/> </ProtectedRoute> }/>
            <Route path={'/package-registration'} element= {<ProtectedRoute> <PackageRegistration/> </ProtectedRoute> }/>
            <Route path={'/edit-package/:id'} element= {<ProtectedRoute> <PackageRegistration/> </ProtectedRoute> }/>
        </Routes>
    )
}

export default PersonRoutes;