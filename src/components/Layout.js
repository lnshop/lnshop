import React from "react";
import Header from "./Header";

import classes from "./Layout.module.scss";
import {useLocation} from 'react-router-dom';


const Layout = ({ children }) => {
    const location = useLocation(); 
    return (
        <>
            <Header />
            <div className={classes.spacer}></div>
            {(location.pathname == "/") && <div className={classes.heroImage}><div className={classes.heroText}>
                For the latest in cutting edge devices, <br />checkout out our shop.
            </div></div>}
            <div className={classes.container}>{children}</div>
        </>
    );
};

export default Layout;
