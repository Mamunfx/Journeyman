import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAxiosSecure = () => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000', 
        withCredentials: true, 
    });

    return axiosInstance; 
};

export default useAxiosSecure; 
