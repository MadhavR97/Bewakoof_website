import { useEffect, useRef, useState } from 'react'
import Navbar from '../component/navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useCart } from '../context/CartContext';


function Product() {
  const { getWishlist } = useCart();
  const filterDiv = useRef(null);
  const navigate = useNavigate();

  // Fetch data from query params
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  // Filters 
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [discountFilter, setDiscountFilter] = useState('');
  const [brandFilters, setBrandFilters] = useState([]);

  useEffect(() => {
    fetchData();
  }, [categoryFilters, priceFilters, discountFilter, brandFilters, category]);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://bewakoof-db-deploy.onrender.com/Products`);
      let data = await res.json();

      // Apply filters
      if (category) {
        data = data.filter(item => item.category === category);
      }

      if (categoryFilters.length > 0) {
        data = data.filter(item => categoryFilters.includes(item.type));
      }

      if (priceFilters.length > 0) {
        data = data.filter(item => {
          return priceFilters.some(price => {
            if (price === "Below 500") return item.price < 500;
            if (price === "Above 500") return item.price >= 500;
            if (price === "Above 1000") return item.price >= 1000;
            if (price === "Above 1500") return item.price >= 1500;
            return true;
          });
        });
      }

      if (discountFilter) {
        const value = parseInt(discountFilter);
        data = data.filter(item => item.discount >= value);
      }

      if (brandFilters.length > 0) {
        data = data.filter(item => brandFilters.includes(item.brand));
      }

      setProducts(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  // Wishlist logic
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('https://bewakoof-db-deploy.onrender.com/wishlist');
      const ids = res.data.map(item => item.id);
      setWishlistIds(ids);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  };

  const handleWishlistAdd = async (product) => {
    try {
      const res = await axios.get(`https://bewakoof-db-deploy.onrender.com/wishlist?id=${product.id}`);

      if (res.data.length === 0) {
        await axios.post('https://bewakoof-db-deploy.onrender.com/wishlist', product);

        setWishlistIds(prev => [...prev, product.id]);
        getWishlist();

        toast.success('Added to wishlist!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error('Already added to wishlist!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  }

  // Filter change handlers
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategoryFilters(prev =>
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  };

  const handlePriceChange = (e) => {
    const { value, checked } = e.target;
    setPriceFilters(prev =>
      checked ? [...prev, value] : prev.filter(v => v !== value)
    );
  };

  const handleDiscountChange = (e) => {
    setDiscountFilter(e.target.value);
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    setBrandFilters(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
  };

  // Render filters
  const renderFilters = () => {
    if (category === 'Mens Clothes' || category === 'Womens Clothes') {
      // Different category options based on gender
      const categoryOptions =
        category === 'Mens Clothes'
          ? ['T-Shirt', 'Shirt', 'Hoodies', 'Joggers']
          : ['T-Shirt', 'Top', 'Hoodies', 'Dress'];

      return (
        <div className='mt-5'>
          {/* Category Filter */}
          <p className='text-white text-sm font-bold md:text-black md:text-base md:font-semibold'>Category</p>
          <ul className='text-gray-400 text-xs mt-2 mb-5 p-2 w-full h-[100px] flex flex-col justify-between md:text-black md:text-sm md:m-0 md:h-[120px]'>
            {categoryOptions.map((cat) => (
              <li key={cat} className='h-[50px] flex items-center'>
                <input
                  type="checkbox"
                  value={cat}
                  onChange={handleCategoryChange}
                  className='mr-1 w-3 h-3 md:w-4 md:h-4 md:mr-2'
                /> {cat}
              </li>
            ))}
          </ul>

          {/* Price Filter */}
          <p className='text-white text-sm font-bold md:text-black md:text-base md:font-semibold'>Price</p>
          <ul className='text-gray-400 text-xs mt-2 mb-5 p-2 w-full h-[100px] flex flex-col justify-between md:text-black md:text-sm md:m-0 md:h-[120px]'>
            {['Below 500', 'Above 500', 'Above 1000', 'Above 1500'].map((price) => (
              <li key={price} className='h-[50px] flex items-center'>
                <input
                  type="checkbox"
                  value={price}
                  onChange={handlePriceChange}
                  className='mr-1 w-3 h-3 md:w-4 md:h-4 md:mr-2'
                /> {price}
              </li>
            ))}
          </ul>

          {/* Discount Filter */}
          <p className='text-white text-sm font-bold md:text-black md:text-base md:font-semibold'>Discount</p>
          <ul className='text-gray-400 text-xs mt-2 mb-5 p-2 w-full h-[150px] flex flex-col justify-between md:text-black md:text-sm md:m-0 md:h-[180px]'>
            {[10, 20, 30, 40, 50, 60].map((discount) => (
              <li key={discount} className='h-[50px] flex items-center'>
                <input
                  type="radio"
                  value={discount}
                  name='discount'
                  onChange={handleDiscountChange}
                  className='mr-1 w-3 h-3 md:w-4 md:h-4 md:mr-2'
                /> {discount}% or More
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Mobile Cover = Brand Filter
    if (category === 'Mobile Cover') {
      return (
        <div className='mt-5'>
          <p className='text-white text-sm font-bold md:text-black md:text-base md:font-semibold'>Brand</p>
          <ul className='text-gray-400 text-xs mt-2 mb-5 p-2 w-full h-[100px] flex flex-col justify-between md:text-black md:text-sm md:m-0 md:h-[120px]'>
            {['Apple', 'Google', 'OnePlus', 'Motorola'].map((brand) => (
              <li key={brand} className='h-[50px] flex items-center'>
                <input
                  type="checkbox"
                  value={brand}
                  onChange={handleBrandChange}
                  className='mr-1 w-3 h-3 md:w-4 md:h-4 md:mr-2'
                /> {brand}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  // Render category label
  const renderCategoryLabel = () => {
    if (category === 'Mobile Cover') {
      return <span className='text-sm font-bold text-black ml-3 md:m-0 md:text-base'>Mobile Covers</span>;
    } else if (category === 'Mens Clothes') {
      return <span className='text-sm font-bold text-black ml-3 md:m-0 md:text-base'>Men's Clothes</span>;
    } else {
      return <span className='text-sm font-bold text-black ml-3 md:m-0 md:text-base'>Women's Clothes</span>;
    }
  };

  return (
    <div className='w-full h-screen'>
      <Navbar />

      {/* Filter Section */}
      <div className='w-[50%] h-screen bg-black p-5 absolute bottom-0 left-[-50%] rounded-tr-lg rounded-br-lg duration-500 ease-in-out z-2 md:hidden' ref={filterDiv}>
        <div className='text-white text-2xl w-full h-[30px] flex justify-end items-center'>
          <i className="fa-solid fa-xmark cursor-pointer" onClick={() => filterDiv.current.style.left = '-50%'}></i>
        </div>

        <div className='mt-5'>
          {renderFilters()}
        </div>
      </div>

      {/* Product Section */}
      <div className='w-full h-[83vh] fixed top-27 md:h-[86vh] md:top-25 md:flex'>
        {/* Mobile render */}
        <div className='px-2 flex justify-between items-center md:hidden'>
          <div className='flex justify-between items-center'>
            <button className='px-5 py-2 bg-black text-white rounded cursor-pointer' onClick={() => filterDiv.current.style.left = '0'}>Filter</button>
            {renderCategoryLabel()}
          </div>
          <p className='text-gray-500 text-[10px] font-semibold'>{products.length} Products</p>
        </div>

        <div className='w-full h-[75vh] mt-2 flex flex-col gap-2 p-2 overflow-auto md:hidden'>
          {products.map((e) => {
            const isWishlisted = wishlistIds.includes(e.id);
            return (
              <div className='border border-[gray] p-2 flex justify-between items-center rounded' key={e.id} onClick={() => navigate(`/product/${e.id}`)}>
                <div className='w-[23%] h-full flex justify-center items-center'>
                  <img src={e.mainImage} alt="" />
                </div>
                <div className='w-[75%] h-full p-2'>
                  <p className='flex justify-between items-center font-bold text-[10px]'>Bewakoof®
                    <i
                      className={`ml-2 text-xs cursor-pointer ${isWishlisted ? 'fa-solid fa-heart text-red-700' : 'fa-regular fa-heart'}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleWishlistAdd(e);
                      }}
                    ></i>
                  </p>
                  <p className='text-[9px] text-gray-500 font-semibold mt-2'>{e.title}</p>
                  <p className='text-[9px] font-semibold mt-1'>₹{e.price} {e.mrp ? <span className='text-gray-500'><del>₹{e.mrp}</del></span> : null} {e.discount ? <span className='text-green-600'>{e.discount}% off</span> : null}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop render */}
        {/* Filter */}
        <div className='w-[25%] h-full hidden p-10 overflow-auto md:block'>
          <div>
            <p className='flex items-center font-semibold'>Home <i className="fa-solid fa-angle-right mx-2 mt-1"></i> <span className='text-gray-500'>{category}</span></p>
          </div>

          <div className='border-b border-[gray] w-full h-[50px] flex items-center mt-5'>
            <p className='text-xl font-semibold'>Filters</p>
          </div>

          <div>
            {renderFilters()}
          </div>
        </div>

        {/* Products */}
        <div className='w-[75%] h-full hidden md:block'>
          <div className='w-full h-[50px] flex justify-between items-center px-5'>
            {renderCategoryLabel()}
            <p className='text-gray-500 text-[10px] font-semibold md:text-sm '>{products.length} Products</p>
          </div>

          <div className='border-t border-l border-[gray] rounded-lg w-full h-[78vh] overflow-auto grid grid-cols-3 p-5 gap-5'>
            {products.map((e) => {
              const isWishlisted = wishlistIds.includes(e.id);
              return (
                <div className='border border-[gray] p-5 flex flex-col justify-between items-center rounded-lg cursor-pointer hover:shadow-md hover:shadow-gray-400' key={e.id} onClick={() => navigate(`/product/${e.id}`)}>
                  <div className='w-full flex justify-center items-center overflow-hidden rounded-lg relative'>
                    <img src={e.mainImage} alt="" />
                    <div className='bg-white flex justify-center items-center gap-1 px-2 py-1 absolute bottom-2 left-2 rounded-lg'>
                      <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                      <p className='font-semibold text-sm'>{e.rating.rate}</p>
                    </div>
                  </div>

                  <div className='w-full pt-5'>
                    <p className='flex justify-between items-center font-bold text-sm'>Bewakoof®
                      <i
                        className={`text-lg ml-2 cursor-pointer ${isWishlisted ? 'fa-solid fa-heart text-red-700' : 'fa-regular fa-heart'}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleWishlistAdd(e);
                        }}>
                      </i>
                    </p>
                    <p className='text-sm text-gray-500 font-semibold mt-2 truncate'>{e.title}</p>
                    <p className='font-bold mt-2'>₹{e.price} {e.mrp ? <span className='text-gray-500 font-semibold'><del>₹{e.mrp}</del></span> : null} {e.discount ? <span className='text-green-600 font-semibold'>{e.discount}% off</span> : null}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  )
}

export default Product;
