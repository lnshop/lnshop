import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import logo from "../pages/logo.png"

import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";

import {useCart} from '../Context'

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });
    const { cart } = useCart();
    console.log(cart);
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const ctaClickHandler = () => {
        menuToggleHandler();
        navigate("/page-cta");
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/" className={classes.header__content__logo}>
                    <img src={logo} /> <div></div>
                </Link>
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/page-two" onClick={menuToggleHandler}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/page-three" onClick={menuToggleHandler}>
                                Contact Us
                            </Link>
                        </li>
                        <li >
                            <Link className={classes.cart} to="/page-cta" onClick={menuToggleHandler}>
                                <GrCart /><div className={classes.badge}>{cart.length}</div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
