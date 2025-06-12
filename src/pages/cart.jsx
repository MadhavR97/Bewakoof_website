import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import quality from '/SingleProduct/quality-product.png'
import security from '/SingleProduct/cyber-security.png'
import returnpolicy from '/SingleProduct/return.png'
import cartSave from '/Cart/discount.png'
import Navbar from '../component/navbar';
import { useCart } from '../context/CartContext';

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const { fetchCart } = useCart();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const res = await axios.get('https://bewakoof-db-deploy.onrender.com/cart');
            setCart(res.data);
        } catch (err) {
            console.log('Error fetching cart items:', err);
        }
    };

    // Delete cart item
    const deleteCart = async (id) => {
        try {
            await axios.delete(`https://bewakoof-db-deploy.onrender.com/cart/${id}`);
            getCart();
            fetchCart();
        } catch (err) {
            console.log('Error deleting cart item:', err);
        }
    };

    // handle quantity
    const handleQuantity = async (id, quantity, action) => {
        if (action === "increment") {
            quantity += 1;
        } else {
            if (quantity > 1) {
                quantity -= 1;
            }
        }
        try {
            await axios.patch(`https://bewakoof-db-deploy.onrender.com/cart/${id}`, { quantity });
            getCart();
        } catch (err) {
            console.log('Error updating quantity:', err);
        }
    };

    return (
        <>
            {/* Mobile View */}
            <div className='w-full h-screen md:hidden'>
                <div className='w-full p-5 flex items-center'>
                    <i className="fa-solid fa-angle-left mr-5 cursor-pointer" onClick={() => navigate('/')}></i>
                    <p className='font-bold'>My Bag {cart.length == 0 ? "" : `(${cart.length} Items)`}</p>
                </div>
                {cart.length > 0 ?
                    <div className='w-full h-[570px] flex flex-col p-2 gap-2 overflow-auto'>
                        {cart.map((e) => {
                            return (
                                <div className='border border-[gray] p-2 flex justify-between items-center rounded' key={e.id}>
                                    <div className='w-[23%] h-full flex justify-center items-center'>
                                        <img src={e.mainImage} alt="" />
                                    </div>
                                    <div className='w-[75%] h-full p-2 relative'>
                                        <p className='flex justify-between items-center font-bold text-[10px]'>Bewakoof®
                                            <i
                                                className={`ml-2 text-xs cursor-pointer text-red-800 fa-solid fa-trash-can`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    deleteCart(e.id);
                                                }}
                                            ></i>
                                        </p>
                                        <p className='text-[9px] text-gray-500 font-semibold mt-2'>{e.title}</p>
                                        {e.category === 'Mobile Cover' ? null : <p className='text-[9px] font-semibold mt-1'>Size : {e.size}</p>}
                                        <p className='text-[9px] font-semibold mt-1'><i className="fa-solid fa-truck"></i> <span className='text-green-600'>Ships in 1-2 days</span></p>
                                        <div className='border flex justify-between items-center px-2 py-1 w-[50px] rounded mt-2'>
                                            <i className="fa-solid fa-minus text-[7px] cursor-pointer" onClick={() => handleQuantity(e.id, e.quantity, 'decrement')}></i>
                                            <p className='text-[9px]'>{e.quantity}</p>
                                            <i className="fa-solid fa-plus text-[7px] cursor-pointer" onClick={() => handleQuantity(e.id, e.quantity, 'increment')}></i>
                                        </div>
                                        <p className='text-[9px] text-right font-bold mt-1 absolute right-0 bottom-0'>₹{e.price * e.quantity} {e.mrp ? <span className='text-gray-500 font-semibold'><del>₹{e.mrp * e.quantity}</del></span> : null} <br /> <span className='text-[green] font-semibold'>You saved ₹{(e.mrp - e.price) * e.quantity}</span></p>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='border border-[gray] p-2 flex flex-col rounded'>
                            <div className='border-b border-dashed border-[gray] pb-2'>
                                <p className='text-base font-bold'>Price Summary</p>
                                <p className='text-sm font-semibold flex justify-between mt-2'>Subtotal <span className='font-bold'>₹{cart.reduce((acc, e) => acc + e.price * e.quantity, 0)}</span></p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 mt-2 font-semibold flex justify-between'>Total MRP (Incl. of taxes) <span>₹{cart.reduce((acc, e) => acc + e.mrp * e.quantity, 0)}</span></p>
                                <p className='text-xs text-gray-500 mt-2 font-semibold flex justify-between'>Bag Discount <span className='text-[green]'>-₹{cart.reduce((acc, e) => acc + (e.mrp - e.price) * e.quantity, 0)}</span></p>
                                <p className='text-xs text-gray-500 mt-2 font-semibold flex justify-between'>Delivery Fee <span className='text-[green]'>Free</span></p>
                                <p className='border border-[green] rounded mt-5 w-full text-xs text-gray-500 font-semibold flex justify-center px-2 py-2 bg-green-100 text-gray-600'>Yayy! You get <span className='ml-1 mr-1 font-bold text-green-600'>FREE delivery</span> on this order</p>
                            </div>
                            <div className='flex justify-evenly items-center mt-5 mb-20 md:mx-5 md:mt-10 md:mb-10'>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={quality} alt="" className='w-[80px] md:w-[100px]' />
                                    <p className='text-[9px] font-bold text-gray-500 text-center mt-2 md:mt-5 md:text-sm'>100% GENUINE <br /> PRODUCT</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={security} alt="" className='w-[80px] md:w-[100px]' />
                                    <p className='text-[9px] font-bold text-gray-500 text-center mt-2 md:mt-5 md:text-sm'>100% SECURE <br /> PAYMENT</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={returnpolicy} alt="" className='w-[80px] md:w-[100px]' />
                                    <p className='text-[9px] font-bold text-gray-500 text-center mt-2 md:mt-5 md:text-sm'>EASY RETURNS & <br /> INSTANT REFUNDS</p>
                                </div>
                            </div>
                            <div className='w-full rounded-tl-lg rounded-tr-lg overflow-hidden fixed right-0 bottom-0'>
                                <div className='flex justify-center items-center py-2 bg-[green]'>
                                    <img src={cartSave} alt="" className='w-[20px] mr-2' />
                                    <p className='text-sm text-white'>You are saving <span className='font-bold'>₹{cart.reduce((acc, e) => acc + (e.mrp - e.price) * e.quantity, 0)}</span> on this order</p>
                                </div>
                                <div className='w-full bg-white flex justify-between items-center px-5 py-2'>
                                    <div>
                                        <p className='font-bold'>₹{cart.reduce((acc, e) => acc + e.price * e.quantity, 0)}</p>
                                        <p className='text-xs text-[#357BB4] font-bold'>VIEW DETAILS</p>
                                    </div>
                                    <div>
                                        <button className='px-15 py-2 rounded cursor-pointer font-bold text-sm bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00]'>PROCEED</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className='w-full h-[570px] flex flex-col justify-center items-center'>
                        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" className='w-[200px]' />
                        <p className='font-bold mt-5'>Hey, your bag feels so light!</p>
                        <p className='text-sm mt-2'>Let’s add some items in your bag</p>
                        <button className='px-5 py-2 mt-5 rounded cursor-pointer font-bold text-sm bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00]' onClick={() => { navigate("/"), window.location.reload() }}>START SHOPPING</button>
                    </div>}
            </div>

            {/* Desktop View */}
            <div className='border hidden md:block'>
                <Navbar />

                {cart.length > 0 ?
                    <div className='fixed top-[100px] left-0 w-full h-[86vh] flex'>
                        <div className='w-[70%] h-full flex flex-col items-center px-10 py-5'>
                            <div className='w-full p-5 flex items-center'>
                                <p className='font-semibold'>My Bag <span className='font-bold'>{cart.length == 0 ? "" : `(${cart.length} Items)`}</span></p>
                            </div>
                            <div className='border border-[green] w-[96%] flex items-center px-5 py-2 bg-green-100 rounded-lg'>
                                <img src={cartSave} alt="" className='w-[20px] mr-2' />
                                <p>You are saving <span className='font-bold text-[green]'>₹{cart.reduce((acc, e) => acc + (e.mrp - e.price) * e.quantity, 0)}</span> on this order</p>
                            </div>
                            <div className='w-full mt-5 px-5 flex flex-col gap-3 overflow-auto'>
                                {cart.map((e) => {
                                    return (
                                        <div className='border border-[gray] p-3 flex justify-between items-center rounded-lg' key={e.id}>
                                            <div className='h-full'>
                                                <img src={e.mainImage} alt="" className='w-[120px] rounded' />
                                            </div>
                                            <div className='w-[85%] h-full p-2 relative'>
                                                <p className='flex justify-between items-center font-bold text-base'>Bewakoof®
                                                    <i
                                                        className={`ml-2 text-sm cursor-pointer text-red-800 fa-solid fa-trash-can`}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            deleteCart(e.id);
                                                        }}
                                                    ></i>
                                                </p>
                                                <p className='text-xs text-gray-500 font-semibold mt-2'>{e.title}</p>
                                                {e.category === 'Mobile Cover' ? null : <p className='text-xs font-semibold mt-1'>Size : {e.size}</p>}
                                                <p className='text-xs mt-1'><i className="fa-solid fa-truck text-[green]"></i> <span className='text-[gray]'>Ships in <span className='font-semibold text-black'>1-2 days</span></span></p>
                                                <div className='border border-[gray] flex justify-between items-center p-1 rounded mt-2 absolute left-0 bottom-0 w-[105px]'>
                                                    <div className='w-[30px] h-[30px] flex justify-center items-center rounded bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00] cursor-pointer' onClick={() => handleQuantity(e.id, e.quantity, 'decrement')}><i className="fa-solid fa-minus text-xs cursor-pointer"></i></div>
                                                    <div className='w-[30px] h-[30px] flex justify-center items-center'><p className='text-xs font-semibold'>{e.quantity}</p></div>
                                                    <div className='w-[30px] h-[30px] flex justify-center items-center rounded bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00] cursor-pointer' onClick={() => handleQuantity(e.id, e.quantity, 'increment')}><i className="fa-solid fa-plus text-xs cursor-pointer"></i></div>
                                                </div>
                                                <p className='text-sm text-right font-bold mt-1 absolute right-0 bottom-0'>₹{e.price * e.quantity} {e.mrp ? <span className='text-gray-500 font-semibold'><del>₹{e.mrp * e.quantity}</del></span> : null} <br /> <span className='text-[green] font-semibold'>You saved ₹{(e.mrp - e.price) * e.quantity}</span></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-[30%] h-full pt-10 pr-10 overflow-auto'>
                            <div className='border border-[gray] p-5 flex flex-col rounded'>
                                <div className='border-b border-dashed border-[gray] pb-5'>
                                    <p className='text-lg font-bold'>Price Summary</p>
                                    <p className='text-base font-semibold flex justify-between mt-2'>Subtotal <span className='font-bold'>₹{cart.reduce((acc, e) => acc + e.price * e.quantity, 0)}</span></p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500 mt-3 font-semibold flex justify-between'>Total MRP (Incl. of taxes) <span>₹{cart.reduce((acc, e) => acc + e.mrp * e.quantity, 0)}</span></p>
                                    <p className='text-sm text-gray-500 mt-3 font-semibold flex justify-between'>Bag Discount <span className='text-[green]'>-₹{cart.reduce((acc, e) => acc + (e.mrp - e.price) * e.quantity, 0)}</span></p>
                                    <p className='text-sm text-gray-500 mt-3 font-semibold flex justify-between'>Delivery Fee <span className='text-[green]'>Free</span></p>
                                    <p className='border border-[green] rounded mt-5 w-full text-sm text-gray-500 font-semibold flex justify-center px-5 py-2 bg-green-100 text-gray-600'>Yayy! You get <span className='ml-1 mr-1 font-bold text-green-600'>FREE delivery</span> on this order</p>
                                    <button className='mt-5 w-full tracking-wide px-15 py-2 rounded cursor-pointer font-bold text-sm bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00]'>PROCEED</button>
                                </div>
                                <div className='flex justify-evenly items-center mt-10 mb-10'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src={quality} alt="" className='w-[70px]' />
                                        <p className='text-xs font-bold text-gray-500 text-center mt-5'>100% GENUINE<br />PRODUCT</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src={security} alt="" className='w-[70px]' />
                                        <p className='text-xs font-bold text-gray-500 text-center mt-5'>100% SECURE<br />PAYMENT</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src={returnpolicy} alt="" className='w-[70px]' />
                                        <p className='text-xs font-bold text-gray-500 text-center mt-5'>EASY RETURNS &<br />INSTANT REFUNDS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className='fixed top-[100px] left-0 w-full h-[86vh] flex flex-col justify-center items-center'>
                        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" className='w-[200px]' />
                        <p className='font-bold mt-5'>Hey, your bag feels so light!</p>
                        <p className='text-sm mt-2'>Let’s add some items in your bag</p>
                        <button className='px-10 py-3 mt-5 rounded cursor-pointer font-bold text-sm bg-[#FEBF00] hover:bg-black hover:text-[#FEBF00]' onClick={() => { navigate("/"), window.location.reload() }}>START SHOPPING</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Cart
