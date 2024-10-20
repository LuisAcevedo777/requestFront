import React from 'react';
import '../App.css'

const AppFooter = () => {
    return (
        <div>
            <footer className="blockquote-footer">

                <div className='footerP'>
                    <h1 className='sourceTitle'>Company</h1>
                    <h3 className='sourceTitle'>tel:  2434343</h3>
                     <div className='footer2'>
                    <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram text-light"></i> </a>
                <a href="https://www.linkedin.com/"><i className="fa-brands fa-linkedin text-light"></i></a>
               <a href="https://www.youtube.com/"><i className="fa-brands fa-square-youtube text-light"></i></a></div>
                </div>
                
                </footer>
        </div>
    );
};

export default AppFooter;