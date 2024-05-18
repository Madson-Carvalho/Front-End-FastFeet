import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/notFound/NotFound";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}

export default PersonRoutes;