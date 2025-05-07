import React from 'react';
import Navbar from './../Components/Navbar';
import Footer from './../Components/Footer';
import { Outlet } from 'react-router-dom';

const Basic_Home = () => {
    return (
        <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    );
};

export default Basic_Home;