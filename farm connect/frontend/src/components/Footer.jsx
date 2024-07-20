// Step 1: Import necessary React module
import React from "react";

// Step 2: Define a functional component named 'Footer'
export default function Footer() {
  // Step 3: Render the component
  return (
    // Step 3.1: Footer container with center-aligned text
    <footer className="container-fluid text-center">
      {/* Step 3.2: Link to navigate to the top of the page */}
      <a href="#home" title="To Top">
        {/* Step 3.2.1: Chevron-up icon for the link */}
        <span className="glyphicon glyphicon-chevron-up"></span>
      </a>
      
      {/* Step 3.3: Copyright information with the current year */}
      <p>
        © Copyright {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
}

