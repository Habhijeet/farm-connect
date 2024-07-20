import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(props) {
    const backgroundStyle = {
        backgroundImage: 'url("lander.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
    };

    const logoStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%', // Make the logo circular
        marginBottom: '20px',
    };

    const titleStyle = {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '5em',
        marginBottom: '30px',
        fontWeight: '700',
    };

    const connectStyle = {
        color: '#000', // Black color for the "CONNECT" text
    };

    const buttonContainerStyle = {
        marginTop: '30px',
    };

    const buttonStyle = {
        fontFamily: 'Open Sans, sans-serif',
        padding: '15px 30px',
        fontSize: '1.5em',
        backgroundColor: 'white', // Change the background color to white
        color: '#333', // Change text color to a contrasting color for readability
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    return (
        <div style={backgroundStyle}>
            <img
                src="https://img.favpng.com/10/6/16/business-logo-handshake-png-favpng-WU15PfEqdKYvpF0W9StAiSKAL.jpg"
                alt="Logo"
                style={logoStyle}
            />

            <h1 style={titleStyle}>
                FARM <span style={connectStyle}>CONNECT</span>
            </h1>

            <div style={buttonContainerStyle}>
                <Link to={'/home'} style={buttonStyle}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}
