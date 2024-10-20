import { Outlet } from "react-router-dom";


const LoginLayout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="container mx-auto mt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default LoginLayout;