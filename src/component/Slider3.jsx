import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

function Slider3() {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios.get(`https://bewakoof-db-deploy.onrender.com/Products?_limit=30`)
            .then((res) => {
                setData(res.data.filter((e) => {
                    return e.category == "Womens Clothes"
                }))
                setLoader(false)
            })
    }, [])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
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

    return (
        <div className="px-4">
            <Slider {...settings}>
                {!loader
                    ? data.map((e, i) => (
                        <div key={i} className='px-2'>
                            <div className='w-full border border-[gray] rounded-sm overflow-hidden'>
                                <div className='w-full relative'>
                                    <img src={e.mainImage} alt="" />
                                    <div className='border border-[gray] absolute bottom-1 left-1 px-3 py-2 bg-white rounded text-xs font-bold'><i className="fa-solid fa-star text-[#FFD232] mr-1"></i>{e.rating.rate}</div>
                                </div>
                                <div className='w-full h-[100px] p-3'>
                                    <p className='font-bold text-sm flex justify-between items-center'>Bewakoof® <i className="fa-regular fa-heart"></i></p>
                                    <p className='text-xs whitespace-nowrap truncate'>{e.title}</p>
                                    <div className='flex items-center mt-1'><span className='font-bold mr-1'>₹{e.price}</span> {e.mrp ? <del className='text-[gray] mr-1'>₹{e.mrp}</del> : null} {e.discount ? <span className='text-[green] font-bold text-xs'>{e.discount}% OFF</span> : null}</div>
                                </div>
                            </div>
                        </div>
                    ))
                    : Array.from({ length: 10 }).map((_, idx) => {
                        return <div role="status" className='px-2 opacity-[0.8] h-[550px] md:h-auto' key={idx}>
                            <div className='w-full h-full border border-[gray] p-8 md:p-5 rounded-sm overflow-hidden'>
                                <div className="flex items-center justify-center h-[400px] md:h-[338px] mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className='w-full h-[85px] flex flex-col justify-evenly'>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                        </div>
                    })}
            </Slider>
        </div>
    )
}

export default Slider3
