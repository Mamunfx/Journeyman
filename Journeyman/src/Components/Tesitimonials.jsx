import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Freelancer",
    image: "https://i.ibb.co.com/k1p2GDd/ben.jpg",
    text: "This platform has been life-changing! The ease of micro-tasking allows me to earn efficiently without hassle. The interface is user-friendly and intuitive, making every task enjoyable.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "James Smith",
    role: "Entrepreneur",
    image: "https://i.ibb.co.com/hRm9vpc/ken.jpg",
    text: "As a business owner, finding reliable workers for small tasks was always a challenge. This platform has solved that problem completely. The payment system is smooth, and the workers are skilled!",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Software Engineer",
    image: "https://i.ibb.co.com/jZ8PKF1/david.jpg",
    text: "Being a developer, I needed side income opportunities. This micro-tasking website offers high-quality tasks and a transparent payout system. Highly recommended!",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Daniel Brown",
    role: "Designer",
    image: "https://i.ibb.co.com/3B3WYft/hardik.jpg",
    text: "I appreciate how this platform values creativity. I can take up design-related micro tasks while earning extra income. A great community and efficient workflow!",
    rating: 4.6,
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex justify-center text-yellow-500 mt-2">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-xl">★</span>
      ))}
      {hasHalfStar && <span className="text-xl">☆</span>}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">
        What Our Users Say
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full"
        style={{
          "--swiper-navigation-color": "rgb(102, 179, 179)", 
          "--swiper-pagination-color": "rgb(102, 179, 179)", 
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 rounded-full border-2 border-[rgb(102,179,179)] mb-4 object-cover" 
              />
              <h3 className="text-xl text-gray-500 font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.role}</p>
              <p className="text-gray-700 mt-4 w-10/12">{testimonial.text}</p>
              <div className="flex items-center justify-center mt-4 mb-8">
                <StarRating rating={testimonial.rating} />
                <span className="ml-2 text-gray-600">{testimonial.rating}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
