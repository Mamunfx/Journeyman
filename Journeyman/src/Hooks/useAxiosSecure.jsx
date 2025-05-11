import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAxiosSecure = () => {

    const axiosInstance = axios.create({
        baseURL: 'https://journeyman-server-sigma.vercel.app', 
        withCredentials: true, 
    });

    return axiosInstance; 
};

export default useAxiosSecure; 
