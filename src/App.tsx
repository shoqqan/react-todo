import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "./models/roates.ts";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {PageType} from "./models/login-page.ts";

export const App = () => {
    return (
        <div className={'w-screen h-screen overflow-hidden bg-[#FFFFFF] font-raleway'}>
            <Routes>
                <Route path={ROUTES.SIGN_IN} element={<LoginPage type={PageType.LOGIN}/>}/>
                <Route path={ROUTES.SIGN_UP} element={<LoginPage type={PageType.REGISTRATION}/>}/>
                <Route path={ROUTES.HOME} element={<HomePage/>}/>
                <Route path={''} element={<Navigate to={ROUTES.HOME}/>}/>
                <Route path={'/'} element={<Navigate to={ROUTES.HOME}/>}/>
            </Routes>
        </div>
    )
}

