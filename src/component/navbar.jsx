import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'

function Navbar() {

    const navigate = useNavigate()

    let searchBar = useRef(null)
    let menuBar = useRef(null)
    let men = useRef(null)
    let women = useRef(null)
    let mobilecover = useRef(null)

    // Search bar Toggle
    let searchRes = () => {
        searchBar.current.style.translate = '0'
    }

    let closeSearchBar = () => {
        searchBar.current.style.translate = '-100%'
    }

    // Menubar Toggle
    let MenuBar = () => {
        menuBar.current.style.translate = '0'
    }

    let closeMenuBar = () => {
        menuBar.current.style.translate = '-100%'
    }

    // Toggle LI Menu
    let menOver = () => {
        men.current.style.display = 'flex'
        women.current.style.display = 'none'
        mobilecover.current.style.display = 'none'
    }

    let womenOver = () => {
        women.current.style.display = 'flex'
        men.current.style.display = 'none'
        mobilecover.current.style.display = 'none'
    }

    let mobilecoverOver = () => {
        mobilecover.current.style.display = 'flex'
        men.current.style.display = 'none'
        women.current.style.display = 'none'
    }

    let menleave = () => {
        men.current.style.display = 'none'
    }

    let womenleave = () => {
        women.current.style.display = 'none'
    }

    let mobilecoverleave = () => {
        mobilecover.current.style.display = 'none'
    }

    const [LoginData, setLoginData] = useState()
    // Login Data
    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem('user'))
        if (loginData) {
            setLoginData(loginData.username)
        }
    }, [])

    const downDesktop = useRef(null)
    const downMobile = useRef(null)

    const [toggle, setToggle] = useState(false)
    // Dropdown Menu
    const handleDropdown = () => {
        setToggle(!toggle)

        if (toggle) {
            downDesktop.current.style.transform = 'rotate(0deg)'
            downMobile.current.style.transform = 'rotate(0deg)'
        } else {
            downDesktop.current.style.transform = 'rotate(180deg)'
            downMobile.current.style.transform = 'rotate(180deg)'
        }
    }

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuth')
        setLoginData(null)
        navigate('/')
        window.location.reload()
    }

    // Cart Data
    const { cartItems, wishlistItems } = useCart()

    // Search Bar
    let [search, setSearch] = useState('')
    let [data, setData] = useState([])

    useEffect(() => {
        axios.get(`https://bewakoof-db-deploy.onrender.com/Products`)
            .then((res) => {
                let filteredData = res.data.filter((item) => {
                    return item.title.toLowerCase().includes(search.toLowerCase())
                })
                setData(filteredData)
            })
    }, [search])

    return (
        <>
            {/* Header */}
            <div className='border-b-1 border-[gray] bg-white w-full h-[100px] fixed top-0 left-0 z-2 md:flex'>
                {/* Logo */}
                <div className='w-full md:w-[20%] h-full flex justify-center items-center relative'>
                    <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg" alt="" className='w-[150px] cursor-pointer' onClick={() => navigate('/')} />
                    <i className='bx bx-search-alt-2 text-3xl cursor-pointer md:invisible md:opacity-0 absolute right-15' onClick={searchRes}></i>
                    <i className='bx bx-menu text-3xl cursor-pointer md:invisible md:opacity-0 absolute right-5' onClick={MenuBar}></i>
                </div>

                {/* LI MENU */}
                <div className='w-[30%] h-full hidden md:flex'>
                    <ul className='w-[70%] h-full flex justify-evenly items-center'>
                        <li className='cursor-pointer relative z-0 before:w-0 before:h-[3px] before:bg-black before:absolute before:bottom-[-3px] before:z-[-1] before:duration-500 hover:before:w-full' onClick={() => navigate('/product?category=Mens Clothes')} onMouseOver={menOver}>MEN</li>
                        <li className='cursor-pointer relative z-0 before:w-0 before:h-[3px] before:bg-black before:absolute before:bottom-[-3px] before:z-[-1] before:duration-500 hover:before:w-full' onClick={() => navigate('/product?category=Womens Clothes')} onMouseOver={womenOver}>WOMEN</li>
                        <li className='cursor-pointer relative z-0 before:w-0 before:h-[3px] before:bg-black before:absolute before:bottom-[-3px] before:z-[-1] before:duration-500 hover:before:w-full' onClick={() => navigate('/product?category=Mobile Cover')} onMouseOver={mobilecoverOver}>MOBILE COVERS</li>
                    </ul>
                </div>

                <div className='w-[50%] h-full flex hidden md:flex'>
                    {/* Searchbar */}
                    <div className='w-[50%] h-full flex flex-col justify-center items-center'>
                        <div className='border border-[gray] w-[80%] h-[50px] rounded bg-[#EAEAEA] flex justify-between items-center overflow-hidden'>
                            <i className="fa-solid fa-magnifying-glass w-[50px] h-full justify-center items-center text-lg" style={{ display: 'flex' }}></i>
                            <input
                                type="text"
                                placeholder='Search by products'
                                className='w-[80%] h-full text-sm outline-none'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    {search.length > 0 &&
                        <div className='w-[768px] max-h-[86vh] absolute top-[100px] bg-white grid grid-cols-4 p-3 gap-3 overflow-auto rounded-lg' style={{ backgroundColor: '#EAEAEA' }}>
                            {data.map((item) => {
                                return <div className='border border-[gray] bg-white p-3 rounded cursor-pointer' key={item.id} onClick={() => { navigate(`/product/${item.id}`), window.location.reload() }}>
                                    <div>
                                        <img src={item.mainImage} alt="" className='w-full rounded' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-semibold mt-2'>{item.title}</p>
                                    </div>
                                </div>
                            })}
                        </div>}

                    {/* Login Menu */}
                    <div className='w-[50%] h-full flex items-center'>
                        <hr className='border-none bg-[gray] w-[25px] h-[3px] rotate-90' />
                        {LoginData
                            ? <div className='flex justify-center items-center h-[40px] rounded-lg border border-[gray] bg-[#EAEAEA] ms-5 px-5 relative'>
                                <p className='font-bold text-sm'>Hi, {LoginData}</p>
                                <i className="fa-solid fa-angle-down mt-1 ms-2 cursor-pointer duration-100" onClick={handleDropdown} ref={downDesktop}></i>

                                {/* Dropdown Menu */}
                                <div className={`bg-white border border-[gray] rounded-md overflow-hidden shadow-lg hover:bg-[black] hover:text-white duration-100 ${toggle ? 'opacity-100 absolute right-0 bottom-[-30px] z-0' : 'opacity-0 absolute right-0 bottom-0 z-[-1]'}`}>
                                    <ul className='flex flex-col'>
                                        <li className='px-3 py-1 cursor-pointer text-sm font-bold' onClick={handleLogout}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                            : <p className='font-bold ms-5 cursor-pointer relative before:w-full before:h-[2px] before:bg-black before:absolute before:bottom-[-2px] before:scale-x-0 before:duration-300 hover:before:scale-x-100' onClick={() => navigate('/login')}>Login</p>}
                        <div className='ms-5 relative'>
                            <i className="fa-solid fa-heart ms-5 cursor-pointer" onClick={() => navigate('/wishlist')}></i>
                            {wishlistItems.length > 0 && <span className='absolute top-[-5px] right-[-10px] text-xs w-4 h-4 flex justify-center items-center bg-[#FEBF00] text-black rounded-full'>{wishlistItems.length}</span>}
                        </div>
                        <div className='ms-5 relative'>
                            <i className="fa-solid fa-bag-shopping cursor-pointer" onClick={() => navigate('/cart')}></i>
                            {cartItems.length > 0 && <span className='absolute top-[-5px] right-[-10px] text-xs w-4 h-4 flex justify-center items-center bg-[#FEBF00] text-black rounded-full'>{cartItems.length}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* LI dropdown Menu for men, women and mobile cover */}
            {/* Men LI Menu */}
            <div className='hidden md:hidden w-full h-[500px] bg-white z-2 absolute top-25 md:flex' ref={men} onMouseLeave={menleave}>
                <div className='w-[17%] h-full p-5'>
                    <p className='font-bold mb-5'>Topwear</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Topwear</li>
                        <li className='cursor-pointer hover:text-black'>All T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Oversized T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Classic Fit T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>All Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Half Sleeve T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Printed T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Plain T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Plus Size Topwear</li>
                        <li className='cursor-pointer hover:text-black'>Customize T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Polo T-Shirts</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full p-5 bg-[#FEFCF5]'>
                    <p className='font-bold mb-5'>Bottomwear</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>Joggers</li>
                        <li className='cursor-pointer hover:text-black'>Trousers & Pants</li>
                        <li className='cursor-pointer hover:text-black'>Trackpants</li>
                        <li className='cursor-pointer hover:text-black'>Jeans</li>
                        <li className='cursor-pointer hover:text-black'>Pajamas</li>
                        <li className='cursor-pointer hover:text-black'>Shorts</li>
                        <li className='cursor-pointer hover:text-black'>Boxers</li>
                        <li className='cursor-pointer hover:text-black'>Plus Size Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>Cargos</li>
                        <li className='cursor-pointer hover:text-black'>Cargo Joggers</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full p-5'>
                    <p className='font-bold mb-5'>Plus Size</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Plus-Size</li>
                        <li className='cursor-pointer hover:text-black'>All Topwear</li>
                        <li className='cursor-pointer hover:text-black'>All Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>All T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>All Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Joggers</li>
                        <li className='cursor-pointer hover:text-black'>Pants & Trousers</li>
                        <li className='cursor-pointer hover:text-black'>Jeans</li>
                        <li className='cursor-pointer hover:text-black'>Pajamas</li>
                        <li className='cursor-pointer hover:text-black'>Shorts</li>
                        <li className='cursor-pointer hover:text-black'>Hoodies</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full bg-[#FEFCF5]'>
                    <div className='w-full h-[40%] p-5'>
                        <p className='font-bold mb-5'>Footwear</p>
                        <ul className='w-full h-[110px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Bewakoof Sneakers</li>
                            <li className='cursor-pointer hover:text-black'>Sliders</li>
                            <li className='cursor-pointer hover:text-black'>Casual Shoes</li>
                        </ul>
                    </div>
                    <div className='w-full h-[60%] p-5'>
                        <p className='font-bold mb-5'>Accessories</p>
                        <ul className='w-full h-[210px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Mobile Covers</li>
                            <li className='cursor-pointer hover:text-black'>Backpacks</li>
                            <li className='cursor-pointer hover:text-black'>Sunglasses</li>
                            <li className='cursor-pointer hover:text-black'>Sling bags</li>
                            <li className='cursor-pointer hover:text-black'>Caps</li>
                            <li className='cursor-pointer hover:text-black'>Mobile Card-Holder</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[32%] h-full p-5'>
                    <p className='font-bold mb-5'>SPECIALS</p>
                    <div className='w-full h-[410px] grid grid-rows-3 grid-cols-2 place-items-center'>
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nab-336x336-1746517328.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168--4--1744016988.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168--8--1721396461.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168-One-Piece-1710143641.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/batman-icon-1652639811.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-cotm--168x168-1698769567.png" className='w-[100px]' alt="" />
                    </div>
                </div>
            </div>

            {/* Women LI Menu */}
            <div className='hidden md:hidden w-full h-[500px] bg-white z-2 absolute top-25 md:flex' ref={women} onMouseLeave={womenleave}>
                <div className='w-[17%] h-full p-5'>
                    <p className='font-bold mb-5'>Topwear</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Topwear</li>
                        <li className='cursor-pointer hover:text-black'>All T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Oversized T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Classic Fit T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>All Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Half Sleeve T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Printed T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Plain T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Plus Size Topwear</li>
                        <li className='cursor-pointer hover:text-black'>Customize T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Polo T-Shirts</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full p-5 bg-[#FEFCF5]'>
                    <p className='font-bold mb-5'>Plus Size</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Plus-Size</li>
                        <li className='cursor-pointer hover:text-black'>All Topwear</li>
                        <li className='cursor-pointer hover:text-black'>All Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>All T-Shirts</li>
                        <li className='cursor-pointer hover:text-black'>All Shirts</li>
                        <li className='cursor-pointer hover:text-black'>Joggers</li>
                        <li className='cursor-pointer hover:text-black'>Pants & Trousers</li>
                        <li className='cursor-pointer hover:text-black'>Jeans</li>
                        <li className='cursor-pointer hover:text-black'>Pajamas</li>
                        <li className='cursor-pointer hover:text-black'>Shorts</li>
                        <li className='cursor-pointer hover:text-black'>Hoodies</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full p-5'>
                    <p className='font-bold mb-5'>Bottomwear</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>All Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>Joggers</li>
                        <li className='cursor-pointer hover:text-black'>Trousers & Pants</li>
                        <li className='cursor-pointer hover:text-black'>Trackpants</li>
                        <li className='cursor-pointer hover:text-black'>Jeans</li>
                        <li className='cursor-pointer hover:text-black'>Pajamas</li>
                        <li className='cursor-pointer hover:text-black'>Shorts</li>
                        <li className='cursor-pointer hover:text-black'>Boxers</li>
                        <li className='cursor-pointer hover:text-black'>Plus Size Bottomwear</li>
                        <li className='cursor-pointer hover:text-black'>Cargos</li>
                        <li className='cursor-pointer hover:text-black'>Cargo Joggers</li>
                    </ul>
                </div>
                <div className='w-[17%] h-full bg-[#FEFCF5]'>
                    <div className='w-full h-[40%] p-5'>
                        <p className='font-bold mb-5'>Footwear</p>
                        <ul className='w-full h-[110px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Bewakoof Sneakers</li>
                            <li className='cursor-pointer hover:text-black'>Sliders</li>
                            <li className='cursor-pointer hover:text-black'>Casual Shoes</li>
                        </ul>
                    </div>
                    <div className='w-full h-[60%] p-5'>
                        <p className='font-bold mb-5'>Accessories</p>
                        <ul className='w-full h-[210px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Mobile Covers</li>
                            <li className='cursor-pointer hover:text-black'>Backpacks</li>
                            <li className='cursor-pointer hover:text-black'>Sunglasses</li>
                            <li className='cursor-pointer hover:text-black'>Sling bags</li>
                            <li className='cursor-pointer hover:text-black'>Caps</li>
                            <li className='cursor-pointer hover:text-black'>Mobile Card-Holder</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[32%] h-full p-5'>
                    <p className='font-bold mb-5'>SPECIALS</p>
                    <div className='w-full h-[410px] grid grid-rows-3 grid-cols-2 place-items-center'>
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168--4--1744016988.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nab-336x336-1746517328.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168--8--1721396461.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/batman-icon-1652639811.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-Nav-168x168-One-Piece-1710143641.png" className='w-[100px]' alt="" />
                        <img src="https://images.bewakoof.com/nav_menu/Circle-cotm--168x168-1698769567.png" className='w-[100px]' alt="" />
                    </div>
                </div>
            </div>

            {/* Mobile-Cover LI Menu */}
            <div className='hidden md:hidden w-full h-[500px] bg-white z-2 absolute top-25 md:flex' ref={mobilecover} onMouseLeave={mobilecoverleave}>
                <div className='w-[20%] h-full p-5'>
                    <p className='font-bold mb-5'>Apple</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>iPhone 16 Pro Max</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 16 Pro</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 16 Plus</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 16</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 15 Pro Max</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 15 Pro</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 15 Plus</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 15</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 14 Max</li>
                        <li className='cursor-pointer hover:text-black'>iPhone 14</li>
                    </ul>
                </div>
                <div className='w-[20%] h-full p-5 bg-[#FEFCF5]'>
                    <p className='font-bold mb-5'>Realme</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>Realme 13 Pro Plus 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme 13 Plus 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme 13 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme Gt7 Pro</li>
                        <li className='cursor-pointer hover:text-black'>Realme 11x 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme 11 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme 10</li>
                        <li className='cursor-pointer hover:text-black'>Realme 8s 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme C65 5G</li>
                        <li className='cursor-pointer hover:text-black'>Realme 12x 5G</li>
                    </ul>
                </div>
                <div className='w-[20%] h-full p-5'>
                    <p className='font-bold mb-5'>Oppo</p>
                    <ul className='w-full h-[400px] flex flex-col justify-evenly text-sm text-[gray]'>
                        <li className='cursor-pointer hover:text-black'>Oppo A3 Pro 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo Reno11 Pro 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo A79 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo A38</li>
                        <li className='cursor-pointer hover:text-black'>Oppo A18</li>
                        <li className='cursor-pointer hover:text-black'>Oppo Reno12 Pro 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo F27 Pro Plus</li>
                        <li className='cursor-pointer hover:text-black'>Oppo A3 Pro 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo Reno11 5G</li>
                        <li className='cursor-pointer hover:text-black'>Oppo F25 Pro 5G</li>
                    </ul>
                </div>
                <div className='w-[20%] h-full bg-[#FEFCF5]'>
                    <div className='w-full h-[50%] p-5'>
                        <p className='font-bold mb-5'>Nothing</p>
                        <ul className='w-full h-[160px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Nothing CMF Phone 1</li>
                            <li className='cursor-pointer hover:text-black'>Nothing Phone 2</li>
                            <li className='cursor-pointer hover:text-black'>Nothing Phone 2a Cover & Cases</li>
                            <li className='cursor-pointer hover:text-black'>Nothing Phone 1</li>
                        </ul>
                    </div>
                    <div className='w-full h-[50%] p-5'>
                        <p className='font-bold mb-5'>Xiaomi</p>
                        <ul className='w-full h-[160px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Xiaomi Redmi Note 12 Pro Plus 5G</li>
                            <li className='cursor-pointer hover:text-black'>Xiaomi Redmi Note 10 Pro 5G</li>
                            <li className='cursor-pointer hover:text-black'>Xiaomi Redmi Note 12 5G</li>
                            <li className='cursor-pointer hover:text-black'>Xiaomi Redmi Note 11 Pro 5G</li>
                        </ul>
                    </div>
                </div>

                <div className='w-[20%] h-full'>
                    <div className='w-full h-[50%] p-5'>
                        <p className='font-bold mb-5'>Google Pixel</p>
                        <ul className='w-full h-[160px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Google Pixel 8</li>
                            <li className='cursor-pointer hover:text-black'>Google Pixel 8a Pro</li>
                            <li className='cursor-pointer hover:text-black'>Google Pixel 8A</li>
                            <li className='cursor-pointer hover:text-black'>Google Pixel 7A</li>
                            <li className='cursor-pointer hover:text-black'>Google Pixel 6A</li>
                        </ul>
                    </div>
                    <div className='w-full h-[50%] p-5'>
                        <p className='font-bold mb-5'>Oneplus</p>
                        <ul className='w-full h-[160px] flex flex-col justify-evenly text-sm text-[gray]'>
                            <li className='cursor-pointer hover:text-black'>Oneplus 13</li>
                            <li className='cursor-pointer hover:text-black'>Oneplus Nord  CE4 Lite</li>
                            <li className='cursor-pointer hover:text-black'>Oneplus Nord 4 5G</li>
                            <li className='cursor-pointer hover:text-black'>Oneplus 12</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Responsive Search div */}
            <div className='md:hidden w-full h-screen fixed top-0 bg-white ease-in-out duration-500 translate-x-[-100%] z-2' ref={searchBar}>
                <div className='w-full h-[50px] flex justify-end items-center'>
                    <i className='bx bx-x text-2xl w-[50px] h-full justify-center items-center cursor-pointer' style={{ display: 'flex' }} onClick={closeSearchBar}></i>
                </div>
                <div className='w-full h-[50px] flex justify-center items-center'>
                    <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg" alt="" className='w-[150px]' onClick={() => navigate('/')} />
                </div>
                <div className='w-full h-[86vh] p-5'>
                    <div className='border border-[gray] w-full h-[50px] rounded bg-[#EAEAEA] flex justify-between items-center overflow-hidden'>
                        <i className="fa-solid fa-magnifying-glass w-[50px] h-full justify-center items-center text-lg" style={{ display: 'flex' }}></i>
                        <input type="text" placeholder='Search by products' className='w-[80%] h-full text-sm outline-none' onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className='w-full h-[450px] mt-5 flex flex-col gap-2 overflow-auto'>
                        {search.length > 0 && data.map((e) => {
                            return (
                                <div className='border border-gray-200 w-full flex justify-start items-center rounded p-3 cursor-pointer' key={e._id} onClick={() => { navigate(`/product/${e.id}`) }}>
                                    <img src={e.mainImage} alt="" className='w-[50px]' />
                                    <p className='h-full flex items-center px-2 text-xs font-bold'>{e.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Responsive Menu Bar */}
            <div className='md:hidden w-full h-screen fixed top-0 bg-white ease-in-out duration-500 translate-x-[-100%] z-2' ref={menuBar}>
                <div className='w-full h-[50px] flex justify-end items-center'>
                    <i className='bx bx-x text-2xl w-[50px] h-full justify-center items-center cursor-pointer' style={{ display: 'flex' }} onClick={closeMenuBar}></i>
                </div>
                <div className='w-full h-[60px] flex justify-center items-center px-5'>
                    {LoginData
                        ? <div className='flex justify-between items-center w-full h-full rounded-lg border border-[gray] bg-[#EAEAEA] px-5'>
                            <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg" alt="" className='w-[150px]' onClick={() => navigate('/')} />
                            <div className='flex items-center'>
                                <p className='text-xs font-bold md:text-base'>Hi, {LoginData}</p>
                                <i className="fa-solid fa-angle-down ms-2 mt- cursor-pointer duration-100" onClick={handleDropdown} ref={downMobile}></i>
                            </div>
                            <div className={`bg-white border border-[gray] rounded-md overflow-hidden shadow-lg hover:bg-[black] hover:text-white duration-100 ${toggle ? 'opacity-100 absolute right-5 top-28' : 'opacity-0 absolute right-5 top-25'}`}>
                                <ul className='w-full'>
                                    <li className='cursor-pointer w-full rounded flex items-center px-3 py-2 text-xs md:text-base' onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        </div>
                        : <img src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg" alt="" className='w-[150px]' onClick={() => navigate('/')} />
                    }
                </div>
                <div className='w-full h-[86vh] p-5'>
                    <ul className='w-full'>
                        <li className='cursor-pointer w-full h-[50px] rounded mb-5 flex items-center ps-5 hover:bg-[#EAEAEA] text-sm' onClick={() => { navigate(`/product?category=Mens Clothes`) }}>MEN</li>
                        <li className='cursor-pointer w-full h-[50px] rounded mb-5 flex items-center ps-5 hover:bg-[#EAEAEA] text-sm' onClick={() => { navigate(`/product?category=Womens Clothes`) }}>WOMEN</li>
                        <li className='cursor-pointer w-full h-[50px] rounded mb-5 flex items-center ps-5 hover:bg-[#EAEAEA] text-sm' onClick={() => { navigate(`/product?category=Mobile Cover`) }}>MOBILE COVERS</li>
                    </ul>
                    <div className='w-full h-[40px] mb-10 mt-10 flex justify-between items-center'>
                        <button className='border border-black w-[30%] h-full rounded-lg bg-black text-white font-bold hover:bg-white hover:text-black hover:border-black cursor-pointer text-xs' onClick={() => navigate('/login')}>Login</button>
                        <button className='border border-black w-[30%] h-full rounded-lg bg-black text-white font-bold hover:bg-white hover:text-black hover:border-black cursor-pointer text-xs flex justify-center items-center' onClick={() => navigate('/wishlist')}>Wishlist {wishlistItems.length > 0 && <span className='bg-[#FEBF00] text-black w-[15px] h-[15px] rounded flex justify-center items-center ms-1'>{wishlistItems.length}</span>}</button>
                        <button className='border border-black w-[30%] h-full rounded-lg bg-black text-white font-bold hover:bg-white hover:text-black hover:border-black cursor-pointer text-xs flex justify-center items-center' onClick={() => navigate('/cart')}>Cart {cartItems.length > 0 && <span className='bg-[#FEBF00] text-black w-[15px] h-[15px] rounded flex justify-center items-center ms-1'>{cartItems.length}</span>}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
