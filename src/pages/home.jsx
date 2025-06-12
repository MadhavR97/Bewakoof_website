import React from 'react'
import Li_menu from '../component/li_menu'
import Navbar from '../component/navbar'
import Slider1 from '../component/Slider1'
import Slider2 from '../component/Slider2'
import Slider3 from '../component/Slider3'
import shopMen1 from '/Shop_Category_Men/1.webp'
import shopMen2 from '/Shop_Category_Men/2.webp'
import shopMen3 from '/Shop_Category_Men/3.webp'
import shopMen4 from '/Shop_Category_Men/4.webp'
import shopMen5 from '/Shop_Category_Men/5.webp'
import shopMen6 from '/Shop_Category_Men/6.webp'
import shopWomen1 from '/Shop_Category_Women/1.webp'
import shopWomen2 from '/Shop_Category_Women/2.jpg'
import shopWomen3 from '/Shop_Category_Women/3.webp'
import shopWomen4 from '/Shop_Category_Women/4.webp'
import shopWomen5 from '/Shop_Category_Women/5.webp'
import shopWomen6 from '/Shop_Category_Women/6.webp'
import Slider4 from '../component/Slider4'
import Slider5 from '../component/Slider5'
import Footer from '../component/footer'

function Home() {
    return (
        <div className='w-full h-screen overflow-auto'>
            <Navbar />
            <Li_menu />
            <div className='w-full h-[350px] md:h-[550px] mt-[160px]'>
                <Slider1 />
            </div>
            <div className='w-full md:h-[600px]'>
                <div className='w-full h-[100px] flex justify-center items-center'>
                    <p className='text-sm md:text-base font-bold'>NEW ARRIVALS</p>
                </div>
                <Slider2 />
            </div>
            <div className='w-full'>
                <div className='w-full h-[100px] grid place-items-center'>
                    <p className='text-sm md:text-base font-bold tracking-widest'>Shop by Category- Men</p>
                </div>
                <div className='w-full overflow-auto'>
                    <div className='w-[350%] grid grid-cols-6 gap-3 p-3 md:w-full md:gap-0 md:p-0'>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen1} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen2} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen3} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen4} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen5} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopMen6} alt="" /></div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[700px] md:h-[600px]'>
                <div className='w-full h-[100px] flex justify-center items-center'>
                    <p className='text-sm md:text-base font-bold'>NEW ARRIVALS</p>
                </div>
                <Slider3 />
            </div>
            <div className='w-full'>
                <div className='w-full h-[50px] md:h-[100px] grid place-items-center'>
                    <p className='text-sm md:text-base font-bold tracking-widest'>Shop by Category- Women</p>
                </div>
                <div className='w-full overflow-auto'>
                    <div className='w-[350%] grid grid-cols-6 gap-3 p-3 md:w-full md:gap-0 md:p-0'>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen1} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen2} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen3} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen4} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen5} alt="" /></div>
                        <div className='rounded-2xl overflow-hidden md:rounded-none'><img src={shopWomen6} alt="" /></div>
                    </div>
                </div>
            </div>
            <Slider4 />
            <Slider5 />
            <Footer />
        </div>
    )
}

export default Home