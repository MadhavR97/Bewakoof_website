import React from 'react'
import Slider from "react-slick";
import image1 from "/Shop_Fandom/1.webp"
import image2 from "/Shop_Fandom/2.webp"
import image3 from "/Shop_Fandom/3.webp"
import image4 from "/Shop_Fandom/4.webp"
import image5 from "/Shop_Fandom/5.webp"
import image6 from "/Shop_Fandom/6.webp"
import image7 from "/Shop_Fandom/7.webp"
import image8 from "/Shop_Fandom/8.webp"
import image9 from "/Shop_Fandom/9.webp"
import image10 from "/Shop_Fandom/10.webp"
import image11 from "/Shop_Fandom/11.webp"
import image12 from "/Shop_Fandom/12.webp"
import image13 from "/Shop_Fandom/13.webp"
import image14 from "/Shop_Fandom/14.webp"
import image15 from "/Shop_Fandom/15.webp"
import image16 from "/Shop_Fandom/16.webp"
import image17 from "/Shop_Fandom/17.webp"
import image18 from "/Shop_Fandom/18.webp"
import image19 from "/Shop_Fandom/19.webp"
import image20 from "/Shop_Fandom/20.webp"
import image21 from "/Shop_Fandom/21.webp"
import image22 from "/Shop_Fandom/22.webp"
import image23 from "/Shop_Fandom/23.webp"
import image24 from "/Shop_Fandom/24.webp"
import image25 from "/Shop_Fandom/25.webp"
import image26 from "/Shop_Fandom/26.webp"

function Slider4() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26];

    return (
        <div className='w-full'>
            <div className='w-full h-[100px] grid place-items-center'>
                <p className='text-sm md:text-base font-bold tracking-widest'>Shop by Fandom</p>
            </div>
            <div className="px-4 w-full h-full">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className="px-2">
                            <div className="w-full h-[250px] md:h-[510px] overflow-hidden rounded-lg flex justify-center items-center">
                                <img src={img} alt={`Slide ${index + 1}`} className="w-full md:w-auto md:h-full" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Slider4
