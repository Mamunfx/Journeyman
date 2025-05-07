import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Slider = () => {
  
  
  return (
    <div className="my-24">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper mt-36">
        <SwiperSlide className='h-20 text-center'>Slide 1</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 2</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 3</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 4</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 5</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 6</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 7</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 8</SwiperSlide>
        <SwiperSlide className='h-20 text-center'>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
