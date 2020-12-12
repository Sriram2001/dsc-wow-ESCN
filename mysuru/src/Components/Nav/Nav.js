import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import './Nav.scss';

export default function Nav() {
    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY < 300
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    }, [scroll]);

    return (
        <nav className={`nav ${scroll ? '' : 'nav-bg'}`}>
            <ul className="nav-left">
                <li>Explore</li>
                <li>Guide</li>
            </ul>
            <img className="nav-logo" src={logo} alt='logo'></img>
            <ul className="nav-right">
                <li>Places</li>
                <li>Places</li>
            </ul>
        </nav>
    )
}
