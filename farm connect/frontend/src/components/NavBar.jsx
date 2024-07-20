// Step 1: Import necessary React module
import React from "react";

// Step 2: Define a functional component named 'NavBar'
export default function NavBar(props) {

    // Step 3: Render the component
    return (

        // Step 3.1: Header container with fixed position at the top
        <header className="page-header mt-0 position-fixed">

            {/* Step 3.2: Flex container with space between items and vertical alignment */}
            <div className="d-flex justify-content-between w-100 align-items-center">

                {/* Step 3.2.1: Flex container for logo and text */}
                <div className="d-flex">

                    {/* Step 3.2.1.1: Logo image */}
                    <img
                        src="https://img.favpng.com/10/6/16/business-logo-handshake-png-favpng-WU15PfEqdKYvpF0W9StAiSKAL.jpg

                        "
                        className="rounded-circle dt-logo"
                        alt="logo"
                    />

                    {/* Step 3.2.1.2: Container for text */}
                    <div className="ml-2 my-auto">

                        {/* Step 3.2.1.3: First line of text */}
                        <span className="header-text1 mx-2 text-uppercase">FARM</span>

                        {/* Step 3.2.1.4: Second line of text */}
                        <span className="header-text2 text-uppercase">connect</span>
                    </div>
                </div>
            </div>
            {/* Step 3.3: Button for user logout */}
            <button className="cursor-pointer btn bg-transparent border-0">
                
                {/* Step 3.3.1: Logout icon */}
                <i className="fa fa-sign-out logout-icon" aria-hidden="true"></i>
            </button>
        </header>
    );
}
