import React, { useContext } from "react";
import {  useState } from 'react'
import {NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css'
import menu from "../../assets/menu-button.png"
import close from "../../assets/close (1).png"
import { CartContext } from "../../contexts/CartContext";

export default function Header() {
    const [cart, setCart] = useContext(CartContext)
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className={styles.toggle} onClick={() => (setToggle(!toggle))}>
                {
                    toggle ?
                        <img src={close} width='30' height='30' alt="close icon" />
                        :
                        <img src={menu} width='30' height='30' alt="menu icon" />
                }
            </div>
            <header className={toggle ? styles.open : styles.close}>
                <Link to='/' >
                    <h1>ECOMMERCE </h1>
                </Link>
                <nav>
                    <ul>
                        <li onClick={() => setToggle(false)}>
                            <NavLink style={({ isActive }) =>
                            (isActive ? {
                                fontWeight: '700',
                                borderBottom: '5px solid var(--primary-color)',
                                paddingBottom: '5px'
                            } : {})} to="/">
                                PRODUCTS
                            </NavLink>
                        </li>
                        <li onClick={() => setToggle(false)}>
                            <NavLink
                                style={({ isActive }) =>
                                (isActive ? {
                                    fontWeight: '700',
                                    borderBottom: '5px solid var(--primary-color)',
                                    paddingBottom: '5px'
                                } : {})}
                                to='/cart'>
                                CART
                            </NavLink>
                            {
                                cart.length > 0
                                    ?
                                    <span className="bg-red-700 p-1 px-2 font-bold rounded-xl text-white">{cart.length}</span>
                                    :
                                    <span></span>
                            }
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}