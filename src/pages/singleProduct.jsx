import { useEffect, useState } from 'react'
import Navbar from '../component/navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ToastContainer, toast, Slide } from 'react-toastify';
import quality from '/SingleProduct/quality-product.png'
import security from '/SingleProduct/cyber-security.png'
import returnpolicy from '/SingleProduct/return.png'
import { useCart } from '../context/CartContext'
import Footer from '../component/footer';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);
  const { fetchCart, getWishlist } = useCart();

  useEffect(() => {
    axios.get(`https://bewakoof-db-deploy.onrender.com/Products/${id}`)
      .then(res => {
        setProduct(res.data);
        setCategory(res.data.category);
      })
    fetchWishlist();
  }, [id]);

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
        toast.success('Added to wishlist!', { position: "top-right", autoClose: 2000, theme: "dark" });
      } else {
        toast.error('Already added to wishlist!', { position: "top-right", autoClose: 2000, theme: "dark" });
      }
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const isWishlisted = wishlistIds.includes(product.id);

  // State for selected size
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  // State for open accordion
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    if (category !== 'Mobile Cover' && !selectedSize) {
      toast.info('Please select a size before adding to bag.', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
      return;
    }

    try {
      const res = await axios.get(`https://bewakoof-db-deploy.onrender.com/cart`);

      const existing = res.data.find(
        item => item.id === product.id && (category === 'Mobile Cover' || item.size === selectedSize)
      );

      if (existing) {
        toast.info('Product already in cart!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        });
      } else {
        const cartProduct = {
          ...product,
          size: category === 'Mobile Cover' ? undefined : selectedSize,
          quantity: 1
        };

        await axios.post(`https://bewakoof-db-deploy.onrender.com/cart`, cartProduct);
        fetchCart();
        toast.success('Added to cart!', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        });
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error('Error adding to cart!', {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
    }
  };

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    product.mainImage,
    product.image1,
    product.image2,
    product.image3,
  ].filter(Boolean);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [product]);

  return (
    <div className='w-full h-screen border-t border-white'>
      <Navbar />

      {/* Product Content */}
      <div className='w-full mt-[100px] h-[541px] overflow-auto md:h-[86vh] md:overflow-visible md:flex'>
        {/* Product Images */}
        {/* Mobile View */}
        <div className='md:hidden'>
          {product.mainImage ? (
            <Carousel showArrows={true} showThumbs={true} infiniteLoop autoPlay>
              {product.mainImage && <div><img src={product.mainImage} alt="Main" /></div>}
              {product.image1 && <div><img src={product.image1} alt="1" /></div>}
              {product.image2 && <div><img src={product.image2} alt="2" /></div>}
              {product.image3 && <div><img src={product.image3} alt="3" /></div>}
            </Carousel>
          ) : (
            <p className="w-full h-[541px] text-center text-[9px] font-bold my-10 flex justify-center items-center">Loading images...</p>
          )}
        </div>

        {/* Desktop View */}
        <div className='hidden md:block w-[40%] h-full p-5'>
          <div className='w-full h-full flex'>
            <div className='w-[20%] h-full px-2 grid grid-rows-4 gap-4'>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`border cursor-pointer hover:border-blue-500 rounded overflow-hidden ${selectedImage === img ? 'border-blue-600 p-1' : ''
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className='w-[80%] h-full px-2'>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Main Selected"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <p className='text-sm text-center w-full h-full flex items-center justify-center'>Loading image...</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className='md:w-[60%] md:h-full md:overflow-auto md:p-10'>
          <div className='w-full px-5 py-2 flex justify-between items-center'>
            <p className='font-semibold md:font-bold'>
              Bewakoof®
            </p>
            <i
              className={`text-xl cursor-pointer ${isWishlisted ? 'fa-solid fa-heart text-red-600' : 'fa-regular fa-heart'}`}
              onClick={() => handleWishlistAdd(product)}
            ></i>
          </div>
          <p className='text-gray-500 text-xs px-5 mt-2 font-semibold md:text-xl'>{product.title}</p>
          <p className='border mt-5 w-[80px] h-[30px] flex justify-center items-center ml-5 rounded bg-black text-white text-xs'><i className="fa-solid fa-star mr-1 text-yellow-400"></i> {product.rating?.rate} ({product.rating?.count})</p>
          <p className='px-5 mt-2 font-semibold text-sm md:text-lg md:font-bold md:mt-5'>₹{product.price} <span className='text-gray-500'><del>₹{product.mrp}</del></span> <span className='text-[green]'>{product.discount}% off</span> <span className='text-gray-500 text-xs'>Inclusive of all taxes</span></p>
          <p className='border mx-5 mt-2 py-2 flex justify-center items-center rounded [background:_linear-gradient(90deg,_rgb(185,_228,_255)_0%,_rgba(185,_228,_255,_0)_60%);] text-[rgb(28,108,158);] text-xs md:text-sm md:mt-5 md:font-semibold'>714 people bought this in the last 7 days</p>
          {category === 'Mobile Cover'
            ? <div className='flex flex-col mx-5 mt-5'>
              <div className='flex items-center'>
                <p className='border px-2 py-1 text-xs font-bold text-gray-500 rounded mr-2 md:px-5 md:py-2'>Premium Dense Fabric</p>
                <p className='border px-2 py-1 text-xs font-bold text-gray-500 rounded md:px-5 md:py-2'>Water Repellent</p>
              </div>
              <ul className='w-full p-3 text-xs text-gray-500 list-disc md:text-sm md:p-5'>
                <li className='mb-2'>Tempered glass back with a glossy finish</li>
                <li className='mb-2'>Rubber edges for soft landings and a good grip</li>
                <li className='mb-2'>Easy access to standard buttons and ports</li>
                <li>Sleek profile</li>
              </ul>
            </div>
            : <>
              <div className='flex items-center mx-5 mt-2 md:mt-5'>
                <p className='border px-2 py-1 text-xs font-bold text-gray-500 rounded mr-2 md:px-5 md:py-2'>Oversized Fit</p>
                <p className='border px-2 py-1 text-xs font-bold text-gray-500 rounded md:px-5 md:py-2'>Premium Dense Fabric</p>
              </div>
              <p className='px-5 mt-5 font-semibold text-sm md:text-base md:font-bold'>Select Size</p>
              <div className='flex items-center mx-5 mt-2 md:mt-5'>
                {sizes.map(size => (
                  <p
                    key={size}
                    className={`border w-[40px] h-[30px] mr-2 flex justify-center items-center text-xs font-bold rounded cursor-pointer md:w-[50px] md:h-[40px] md:text-sm ${selectedSize === size ? 'bg-[#292D35] text-white' : 'text-gray-500'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </p>
                ))}
              </div>
              <p className='text-xs px-5 mt-5 font-semibold md:text-sm'>Garment (In Inches) <span className='text-gray-500'>Bust :</span>43 | <span className='text-gray-500'>Sleeve Length :</span>7.25 | <span className='text-gray-500'>Front Length :</span>20.5</p>
            </>}
          <div className='flex justify-center items-center mt-5 py-2 bg-[#D1EDFF] md:mx-5 md:py-3'>
            <i className="fa-solid fa-truck-fast mr-2 text-xs text-[rgb(28,108,158);] md:text-sm"></i>
            <p className='text-xs text-[rgb(28,108,158);] font-semibold md:text-sm'>This product is eligible for FREE SHIPPING</p>
          </div>

          {category === 'Mobile Cover'
            ? null
            : <>
              <p className='px-5 mt-5 font-semibold text-sm md:text-base md:font-bold'>Key Highlights</p>
              <div className='border border-gray-500 rounded mx-5 mt-5 grid grid-cols-2 gap-5 p-5'>
                {product.design &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Design</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.design}</p>
                  </div>}
                {product.fit &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Fit</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.fit}</p>
                  </div>}
                {product.neck &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Neck</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.neck}</p>
                  </div>}
                {product.distress &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Distress</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.distress}</p>
                  </div>}
                {product.occasion &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Occasion</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.occasion}</p>
                  </div>}
                {product.sleeve &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Sleeve</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.sleeve}</p>
                  </div>}
                {product.closure &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Closure</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.closure}</p>
                  </div>}
                {product.washcare &&
                  <div className='py-2'>
                    <p className='font-semibold text-[10px] text-gray-500 md:text-sm'>Washcare</p>
                    <p className='text-xs font-semibold md:text-lg'>{product.washcare}</p>
                  </div>}
              </div>
            </>
          }

          <div className="mx-5 mt-5 space-y-2">
            {/* Accordion 1 */}
            <div className="border border-gray-500 rounded">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggle(0)}
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-list"></i>
                  <div>
                    <p className="font-semibold text-sm">Product Description</p>
                    <p className="text-xs text-gray-500">Manufacture, Care and Fit</p>
                  </div>
                </div>
                <i className={`fa-solid fa-angle-${openIndex === 0 ? 'up' : 'down'}`}></i>
              </div>
              {openIndex === 0 && (
                <div className="px-6 pb-4 text-xs text-gray-700 md:text-sm">
                  <p className='mb-4'>{product.des1}</p>
                  <p className='mb-4'>{product.des2}</p>
                  <p>{product.des3}</p>
                </div>
              )}
            </div>

            {/* Accordion 2 */}
            <div className="border border-gray-500 rounded">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggle(1)}
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-person-walking-arrow-loop-left"></i>
                  <div>
                    <p className="font-semibold text-sm">15 Days Returns & Exchange</p>
                    <p className="text-xs text-gray-500">Know about return & exchange policy</p>
                  </div>
                </div>
                <i className={`fa-solid fa-angle-${openIndex === 1 ? 'up' : 'down'}`}></i>
              </div>
              {openIndex === 1 && (
                <div className="px-6 pb-4 text-xs text-gray-700 md:text-sm">
                  <p>
                    Easy returns upto 15 days of delivery. Exchange available on select
                    pincodes
                  </p>
                </div>
              )}
            </div>
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
          <button className='w-[90%] h-[40px] flex justify-center items-center ml-[5%] rounded cursor-pointer bg-[#FFD232] text-black font-semibold text-sm hover:bg-black hover:text-[#FFD232] fixed bottom-2 md:static md:w-full md:h-[50px] md:font-bold md:m-0' onClick={handleAddToCart}>ADD TO BAG</button>
        </div>
      </div>
      <div className='hidden md:block'>
        <Footer />
      </div>
      <ToastContainer transition={Slide} autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default SingleProduct;
