import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetchCart();
        getWishlist();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get('https://bewakoof-db-deploy.onrender.com/cart');
            setCartItems(res.data);
        } catch (err) {
            console.log('Error fetching cart items:', err);
        }
    };

    const getWishlist = async () => {
        try {
            const res = await axios.get('https://bewakoof-db-deploy.onrender.com/wishlist');
            setWishlistItems(res.data);
        } catch (err) {
            console.log('Error fetching wishlist items:', err);
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, fetchCart, wishlistItems, setWishlistItems, getWishlist }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
