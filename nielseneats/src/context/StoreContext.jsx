import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems"); // Added line
    return savedCart ? JSON.parse(savedCart) : {}; // Added line
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Added line
  }, [cartItems]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://teamachievers-1.onrender.com/prods", {
        headers: {
          authentication: "Bearer " + localStorage.getItem("token"),
        },
      });
      setApiData(response.data);
      setLoading(false);
    } catch (error) {
      setApiError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] > 1) {
        updatedCartItems[itemId] -= 1;
      } else {
        delete updatedCartItems[itemId];
      }
      return updatedCartItems;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = apiData.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list: apiData,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {loading ? <h1>Loading...</h1> : apiError ? <h1>Something went wrong</h1> : props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
