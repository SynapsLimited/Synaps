import React, { Fragment } from 'react';
import './../css/logoshowcase.css'; // Ensure this path is correct

function LogoShowcase(){
    return (
        <Fragment>
             <section data-aos="fade-up"  id="logo-showcase" className="container logo-showcase">
        <img src="/assets/Synaps Logos/Synaps Logo Art copy.png" alt="Synaps Logo" className="logo-image" />
    </section>

        </Fragment>
    )
}

export default LogoShowcase;