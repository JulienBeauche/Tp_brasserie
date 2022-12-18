import React from "react";


//Composant d'en-tête pour le site Web.
const Header = () => {
    return (
        <div className='d-flex flex-row justify-content-center align-items-center pt-4'>
            <h1 id='siteTitle' className='mt-1'>
                Rechercher votre brasserie 
            </h1>
            
        </div>
    );
};

export default Header;
