import React from 'react'

function Footer() {
    return (
        <div className='w-full bg-[#1C1C1C]'>
            {/* Mobile View */}
            <div className='w-full p-7  bg-[#1C1C1C] md:hidden'>
                <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-tribe-trademark-logo.svg" className='w-[200px] mb-10 mt-5' alt="" />
                <p className='text-[#FEBF00] mb-3 font-bold text-sm md:text-base'>CUSTOMER SERVICE</p>
                <ul className='text-center w-full h-[120px] flex flex-col justify-evenly items-start text-sm'>
                    <li className='text-white text-xs'>Contact Us</li>
                    <li className='text-white text-xs'>Track Order</li>
                    <li className='text-white text-xs'>Return Order</li>
                    <li className='text-white text-xs'>Cancel Order</li>
                </ul>
                <ul className='mt-3 text-center w-full h-[50px] flex flex-col items-start justify-between text-sm'>
                    <li className='text-white text-xs'><i className="fa-solid fa-truck-fast"></i> 15 Days Return Policy</li>
                    <li className='text-white text-xs'><i className="fa-solid fa-money-bill"></i> Cash On Delivery</li>
                </ul>
                <p className='text-[#FEBF00] mb-3 mt-5 font-bold text-sm'>COMPANY</p>
                <ul className='text-white text-center mb-3 w-full h-[120px] flex flex-col justify-evenly items-start text-xs md:text-base'>
                    <li>About Us</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>We are Hiring</li>
                </ul>
                <p className='text-[#FEBF00] mb-3 mt-5 font-bold text-sm'>DOWNLOAD THE APP</p>
                <div className='flex md:justify-between md:w-[80%]'>
                    <img src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fweb%2Fapp_android_v1.png&w=256&q=75" alt="" className='cursor-pointer' />
                    <img src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fweb%2Fapp_ios_v1.png&w=256&q=75" alt="" className='cursor-pointer ml-2 md:ml-0' />
                </div>
                <p className='text-[#FEBF00] mb-3 mt-5 font-bold text-sm'>CONNECT WITH US</p>
                <div className='w-[40%] text-white text-2xl flex justify-between items-center mb-5 mt-5'>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-pinterest-p"></i>
                    <i className="fa-brands fa-snapchat"></i>
                    <i className="fa-brands fa-apple"></i>
                </div>
                <p className='text-[#FEBF00] mb-3 font-bold mt-5 text-sm'>KEEP UP TO DATE</p>
                <div className='border border-b-[#FEBF00] w-full h-[40px]'>
                    <input type="text" placeholder='Enter Email ID' className='border border-none text-white text-sm w-[65%] h-full ps-5 bg-black outline-none' />
                    <button className='border border-none bg-[#FEBF00] text-xs font-bold w-[35%] h-full cursor-pointer'>SUBSCRIBE</button>
                </div>
            </div>

            {/* Desktop View */}
            <div className='w-full bg-[#1C1C1C] md:grid md:grid-cols-4 md:h-[400px] hidden'>
                <div className='w-full h-[300px] flex flex-col justify-center items-center md:h-full md:justify-start md:items-start p-10 relative'>
                    <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-tribe-trademark-logo.svg" className='w-[200px] mb-5 absolute top-8 md:top-10' alt="" />
                    <p className='text-[#FEBF00] mb-5 font-bold mt-15'>CUSTOMER SERVICE</p>
                    <ul className='text-center w-full md:w-full md:h-[120px] md:flex md:flex-col md:justify-evenly md:items-start md:text-sm'>
                        <li className='text-white'>Contact Us</li>
                        <li className='text-white'>Track Order</li>
                        <li className='text-white'>Return Order</li>
                        <li className='text-white'>Cancel Order</li>
                    </ul>
                    <ul className='mt-3 text-center md:w-full md:h-[50px] md:flex md:flex-col md:items-start md:justify-between md:text-sm'>
                        <li className='text-white'><i className="fa-solid fa-truck-fast"></i> 15 Days Return Policy</li>
                        <li className='text-white'><i className="fa-solid fa-money-bill"></i> Cash On Delivery</li>
                    </ul>
                </div>

                <div className='w-full h-[300px] flex flex-col justify-center items-center md:h-full md:justify-start md:items-start p-10'>
                    <p className='text-[#FEBF00] mb-5 font-bold mt-15'>COMPANY</p>
                    <ul className='text-white text-center mb-3 md:w-full md:h-[120px] md:flex md:flex-col md:justify-evenly md:items-start md:text-sm'>
                        <li>About Us</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>We are Hiring</li>
                    </ul>
                    <p className='text-[#FEBF00] mb-5 font-bold'>DOWNLOAD THE APP</p>
                    <div className='w-[80%] flex justify-between md:w-[92%]'>
                        <img src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fweb%2Fapp_android_v1.png&w=256&q=75" alt="" className='cursor-pointer' />
                        <img src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fweb%2Fapp_ios_v1.png&w=256&q=75" alt="" className='cursor-pointer' />
                    </div>
                </div>

                <div className='w-full h-[300px] flex flex-col justify-center items-center md:h-full md:justify-start md:items-start p-10'>
                    <p className='text-[#FEBF00] mb-5 font-bold mt-15'>CONNECT WITH US</p>
                    <ul className='text-white w-full text-center mb-3 md:w-full md:h-[60px] md:mb-5 md:flex md:flex-col md:justify-evenly md:items-start md:text-sm'>
                        <li><i className="fa-brands fa-facebook-f mr-2"></i>4.7M People like this</li>
                        <li><i className="fa-brands fa-instagram mr-2"></i>1M People like this</li>
                    </ul>
                    <div className='w-[30%] text-white text-2xl flex justify-between items-center mb-5 md:mb-7 md:w-[40%] md:text-md'>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-pinterest-p"></i>
                        <i className="fa-brands fa-snapchat"></i>
                        <i className="fa-brands fa-apple"></i>
                    </div>
                    <p className='text-[#FEBF00] mb-5 font-bold'>100% SECURE PAYMENT</p>
                    <div className='w-[40%] text-2xl flex justify-between items-center text-white md:w-[55%]'>
                        <i className="fa-brands fa-google-pay"></i>
                        <i className="fa-brands fa-apple-pay"></i>
                        <i className="fa-brands fa-amazon-pay"></i>
                        <i className="fa-brands fa-paypal"></i>
                    </div>
                </div>

                <div className='w-full h-[300px] flex flex-col justify-center items-center md:h-full md:justify-start md:items-start p-10'>
                    <p className='text-[#FEBF00] mb-5 font-bold mt-15'>KEEP UP TO DATE</p>
                    <div className='border border-b-[#FEBF00] w-[80%] h-[40px]'>
                        <input type="text" placeholder='Enter Email ID' className='border border-none text-[gray] w-[60%] h-full ps-5 bg-black outline-none' />
                        <button className='border border-none bg-[#FEBF00] font-bold w-[40%] h-full md:text-sm cursor-pointer'>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
