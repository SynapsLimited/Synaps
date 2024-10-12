import React from "react";
import LoadingGif from '../images/loading.gif'

const Loader = () => {
    return (
        <div data-aos="fade-up" className="loader">
            <div data-aos="fade-up" className="loader-image">
                <img src={LoadingGif} alt="" />
            </div>
        </div>
    )
}


export default Loader