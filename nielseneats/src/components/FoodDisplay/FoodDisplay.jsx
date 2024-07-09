import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const [apiError, setApiDError] = useState(false);
    const fetchData = async () => {
      try {
          const response = await axios.get("http://localhost:3000/prods", {
              headers: {
                  authentication: "Bearer " + localStorage.getItem("token")
              }
          })
          setApiData(response.data)
          isLoading(false)
      } catch (error) {
          setApiDError(true)
      }
    }

    useEffect(() => {
      fetchData()
      },[])
    if (apiError) {
        return <h1>Something went wrong</h1>
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    
    const food_list = apiData;

  return (
    <div className='food-display' id='food-display'>
        <h2 >Top dishes near you</h2>
        <div className="food-display-list">
          {food_list.map((item,index)=>{
            if(category==="All" || category===item.category){
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
          })}
        </div>
    </div>
  )
}

export default FoodDisplay