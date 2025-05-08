import React from 'react';
import Slider from '../Components/Slider';
import TopWorkers from "../Components/TopWorkers"
import Testimonials from '../Components/Tesitimonials';
import FeaturesSection from '../Components/FeaturesSection';
import PricingSection from '../Components/PricingSection';

import JobDiscovery from '../Components/JobDiscovery';
const Home = () => {
    return (
        <div className='w-11/12 mx-auto max-w-[1366px] space-y-14'> 
            <Slider></Slider>
           
            <TopWorkers></TopWorkers>
            <FeaturesSection></FeaturesSection>
            <PricingSection></PricingSection>
            <Testimonials></Testimonials>
 
        </div>
    );
};

export default Home;