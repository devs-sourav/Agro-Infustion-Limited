// src/BackToTopButton.js
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-20 z-20 right-5 bg-primary text-white font-bold w-10 h-10 flex justify-center items-center rounded-full shadow-lg transition-transform duration-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
            <FaArrowUp />
        </button>
    );
};

export default BackToTopButton;
