import React from "react";
import Slider from "react-slick";
import image1 from '/Slider 1/1.gif';
import image2 from '/Slider 1/2.webp';
import image3 from '/Slider 1/3.webp';
import image4 from '/Slider 1/4.webp';
import image5 from '/Slider 1/5.webp';
import image6 from '/Slider 1/6.webp';
import image7 from '/Slider 1/7.jpg';
import image8 from '/Slider 1/8.webp';

export default function Slider1() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 768, // For Mobile Devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const images = [image1, image2, image3, image4, image5, image6, image7, image8];

    return (
        <div className="px-4 w-full h-full">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index} className="px-2">
                        <div className="w-full h-[300px] md:h-[510px] overflow-hidden rounded-lg">
                            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
