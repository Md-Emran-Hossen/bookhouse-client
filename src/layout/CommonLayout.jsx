// import HomePage from "../pages/HomePage"
// import Navbar from "../shared/Navbar";

import { Outlet } from "react-router-dom";

const CommonLayout = () => {
    return (
        <div>
          <h3> This is a Common Layout Page. </h3>
          {/* <Navbar></Navbar>  
             <HomePage></HomePage> */}
              <Outlet></Outlet>
        </div>
    );
};

export default CommonLayout;