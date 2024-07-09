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
    useEffect(() => {

        if (localStorage.getItem("token")) {//to check if we are login or not
            (async () => {
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
            })();
        } else {
            alert("Please login")
        }

    })
    if (apiError) {
        return <h1>Something went wrong</h1>
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    const result = apiData.map((data) =>
      <div class="tweet-wrap">
      <p key={data.userId}/>
      <div class="tweet-header">
          <p><span>Username </span>  @username</p>
          <h5>{data.name}</h5>
          <p>{data.description}.</p>
      </div>
      <div class="tweet-info-counts">
          <div class="comments">
              <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <div class="comment-count">33</div>
          </div>
         
          <div class="retweets">
              <svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
              <div class="retweet-count">397</div>
          </div>
          <div class="likes">
              <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <div class="likes-count">2.6k</div>
          </div>
         
          <div class="message">
               <svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
      </div>
  </div>
      );
  return (
    <div className='food-display' id='food-display'>
        <h2 >Top dishes near you</h2>
        {result}
      
    </div>
  )
}

export default FoodDisplay
