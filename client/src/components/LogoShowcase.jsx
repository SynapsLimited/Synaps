import React, { Fragment } from 'react';
import './../css/logoshowcase.css'; // Ensure this path is correct

function LogoShowcase(){
    return (
        <Fragment>
             <section id="logo-showcase" className="container logo-showcase">
        <img src="/assets/Synaps Logos/Synaps Logo Art copy.png" alt="Synaps Logo" className="logo-image" />
    </section>

      <script src = "/resources/jquery-3.5.1.js"></script>
        </Fragment>
    )
}

export default LogoShowcase;