import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';

export default function Footer() {
    const Footer = styled.footer`
        /* margin-top: 50px; */
        width: 100%;
        min-height: 300px;
        background-color: #131111;
        font-size: 20px;
        font-family: 'Open Sans', sans-serif;
        color: #ad7d52;
        & a {
            text-decoration: none;
        }
        & .container {
            display: flex;
            flex-wrap: wrap;
        }
    `;

    const Title = styled.div`
        padding: 30px;
        width: calc(100% / 3);
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        & a {
            font-weight: 300;
            font-size: 16px;
        }
        & img {
            height: 200px;
        }
        @media (max-width: 760px) {
            width: 100%;
        }
    `;

    const Links = styled.div`
        padding: 30px;
        width: calc(100% / 3);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 760px) {
            width: 100%;
            min-height: 250px;
        }
        & div {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        & a {
            font-size: 16px;
            color: #f58026;
            transition: all 0.2s ease-in-out;
        }
        & a:hover {
            color: #dc0963;
        }
    `;

    // const Contact = styled.div`
    //     padding: 30px;
    //     width: calc(100% / 3);
    //     text-align: center;
    //     @media (max-width: 760px) {
    //         width: 100%;
    //     }
    //     & h3 {
    //         margin-bottom: 30px;
    //     }
    //     & a {
    //         color: #ad7d52;
    //     }
    //     & p {
    //         font-size: 16px;
    //     }
    // `;
    const Contact = styled.div`
        padding: 30px;
        width: calc(100% / 3);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 760px) {
            width: 100%;
            min-height: 250px;
        }
        & div {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            font-size: 16px;
        }
        & a {
            color: #f58026;
            transition: all 0.2s ease-in-out;
        }
        & a:hover {
            color: #dc0963;
        }
    `;


    return (
        <Footer>
            <div className="container">
                <Title>
                    <img src={logo} alt=""></img>
                </Title>
                <Links>
                    <h3>Links</h3>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/places">About</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/organizations">Organizations</Link>
                        {/* <Link to="/profile">Profile</Link> */}
                    </div>
                </Links>
                <Contact>
                    <h3>Social</h3>
                    <div>
                        <p>
                            <MailOutlineIcon />
                            <a href="mailto:some@mail.com">
                                some@mail.com
                        </a>
                        </p>
                        <p>
                            <InstagramIcon />
                            <a href="https://www.instagram.com/mysuru/">
                                @mysuru
                        </a>
                        </p>
                    </div>

                </Contact>
            </div>
        </Footer>
    );
}