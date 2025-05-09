import React from 'react';
import Slider from '../Components/Slider';
import TopWorkers from "../Components/TopWorkers"
import Testimonials from '../Components/Tesitimonials';
import FeaturesSection from '../Components/FeaturesSection';
import PricingSection from '../Components/PricingSection';
import ShowOfTask from '../Components/ShowOfTask';
import RecentJobs from '../Components/RecentJobs';


const Home = () => {
    return (
        <div className=' mx-auto max-w-[1366px] space-y-14'> 
            <Slider></Slider>
           <RecentJobs></RecentJobs>
            <TopWorkers></TopWorkers>
            <FeaturesSection></FeaturesSection>
            <PricingSection></PricingSection>
            <Testimonials></Testimonials>
 
        </div>
    );
};

export default Home;