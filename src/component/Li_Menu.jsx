import React from 'react'
import { useNavigate } from 'react-router-dom';

function Li_menu() {

    const navigate = useNavigate();

    const handleClick = (category) => {
        navigate(`/product?category=${category}`);
    }

    return (
        <div className='border-b-1 border-[gray] w-full h-[50px] overflow-auto fixed top-[100px] z-1 bg-white'>
            <ul className='w-[300%] md:w-[130%] h-full flex justify-evenly items-center'>
                <li className='cursor-pointer text-xs md:text-sm font-semibold' onClick={() => { handleClick('Mens Clothes') }}>MEN</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold' onClick={() => { handleClick('Womens Clothes') }}>WOMEN</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>LIVE NOW</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>SHOP NOW</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>PLUS SIZE</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>ACCESSORIES</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>OFFICIAL MERCH</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>SNEAKERS</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>BEWAKOOF AIR</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>HEAVY DUTY</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>CUSTOMIZATION</li>
                <li className='cursor-pointer text-xs md:text-sm font-semibold'>WINTERWEAR</li>
            </ul>
        </div>
    )
}

export default Li_menu
