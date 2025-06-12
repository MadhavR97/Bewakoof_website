import React from 'react'
import Slider from "react-slick";
import image1 from "/Slider 5/1.webp"
import image2 from "/Slider 5/2.jpg"
import image3 from "/Slider 5/3.jpg"
import image4 from "/Slider 5/4.webp"
import image5 from "/Slider 5/5.webp"
import image6 from "/Slider 5/6.webp"
import image7 from "/Slider 5/7.webp"
import image8 from "/Slider 5/8.webp"

function Slider5() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 768, // For Mobile Devices
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const images = [image1, image2, image3, image4, image5, image6, image7, image8];

    return (
        <div className='w-full'>
            <div className='w-full h-[100px] grid place-items-center'>
                <p className='text-sm md:text-base font-bold tracking-widest'>TOO HOT TO BE MISSED</p>
            </div>
            <div className="px-4 w-full h-full">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className="px-2">
                            <div className="w-full h-[250px] md:h-[350px] overflow-hidden rounded-lg flex justify-center items-center">
                                <img src={img} alt={`Slide ${index + 1}`} className="w-full md:w-auto md:h-full" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Slider5
