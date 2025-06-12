import { useEffect, useState } from 'react'
import Navbar from '../component/navbar'
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
    const { getWishlist } = useCart();
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('https://bewakoof-db-deploy.onrender.com/wishlist');
            setWishlist(res.data);
        }
        catch (err) {
            console.error('Failed to fetch wishlist:', err);
        }
    };

    const deleteWishlist = async (id) => {
        try {
            await axios.delete(`https://bewakoof-db-deploy.onrender.com/wishlist/${id}`);
            fetchWishlist();
            getWishlist();
        }
        catch (err) {
            console.error('Failed to delete wishlist item:', err);
        }
    };

    return (
        <div className='w-full h-screen'>
            <Navbar />

            {/* Mobile View */}
            <div className='md:hidden fixed top-[100px]'>
                {wishlist.length > 0 ? (
                    <div className='w-full h-[541px] flex flex-col p-2 gap-2 overflow-auto'>
                        <div className='border-b border-[gray] w-full p-2'>
                            <p className='text-[12px] font-bold'>My Wishlist ({wishlist.length})</p>
                        </div>
                        {wishlist.map((e) => {
                            return (
                                <div className='border border-[gray] p-2 flex justify-between items-center rounded cursor-pointer' key={e.id} onClick={() => navigate(`/product/${e.id}`)}>
                                    <div className='w-[23%] h-full flex justify-center items-center'>
                                        <img src={e.mainImage} alt="" />
                                    </div>
                                    <div className='w-[75%] h-full p-2'>
                                        <p className='flex justify-between items-center font-bold text-[10px]'>Bewakoof®
                                            <i className="fa-solid fa-trash-can text-red-800 cursor-pointer"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    deleteWishlist(e.id);
                                                }}>
                                            </i>
                                        </p>
                                        <p className='text-[9px] text-gray-500 font-semibold mt-2'>{e.title}</p>
                                        <p className='text-[9px] font-semibold mt-1'>₹{e.price} {e.mrp ? <span className='text-gray-500'><del>₹{e.mrp}</del></span> : null} {e.discount ? <span className='text-green-600'>{e.discount}% off</span> : null}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className='w-full h-[541px] fixed top-[100px] flex flex-col p-2 gap-2 overflow-auto'>
                        <div className='w-full h-[530px] flex flex-col justify-center items-center'>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="" className='w-[200px]' />
                            <p className='mt-3 font-bold'>Your wishlist is empty</p>
                            <p className='text-gray-500 text-[12px]'>You have no items in your wishlist. Start adding!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop View */}
            <div className='hidden md:block'>
                {wishlist.length > 0 ? (
                    <div className='w-full h-[86vh] fixed top-[100px] flex flex-col p-5'>
                        <div className='border-b-2 border-[gray] w-full p-5'>
                            <p className='text-lg font-bold'>My Wishlist ({wishlist.length})</p>
                        </div>
                        <div className={`w-full grid grid-cols-5 gap-5 p-5 overflow-auto mt-5`}>
                            {wishlist.map((e) => {
                                return (
                                    <div className='border border-[gray] p-5 flex flex-col justify-between items-center rounded cursor-pointer' key={e.id} onClick={() => navigate(`/product/${e.id}`)}>
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <img src={e.mainImage} alt="" className='rounded' />
                                        </div>
                                        <div className='w-full h-full mt-5 p-2'>
                                            <p className='flex justify-between items-center font-bold text-sm'>Bewakoof®
                                                <i className="fa-solid fa-trash-can text-red-800 cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        deleteWishlist(e.id);
                                                    }}>
                                                </i>
                                            </p>
                                            <p className='text-xs text-gray-500 font-semibold mt-2'>{e.title}</p>
                                            <p className='text-sm font-bold mt-2'>₹{e.price} {e.mrp ? <span className='text-gray-500'><del>₹{e.mrp}</del></span> : null} {e.discount ? <span className='text-green-600'>{e.discount}% off</span> : null}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                ) : (
                    <div className='w-full h-[86vh] fixed top-[100px] flex flex-col p-2 gap-2 overflow-auto'>
                        <div className='w-full h-[530px] flex flex-col justify-center items-center'>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="" className='w-[250px]' />
                            <p className='mt-5 font-bold text-lg'>Your wishlist is empty</p>
                            <p className='text-gray-500 text-sm mt-2'>You have no items in your wishlist. Start adding!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
