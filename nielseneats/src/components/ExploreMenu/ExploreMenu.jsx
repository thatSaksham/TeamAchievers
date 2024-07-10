import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './ExploreMenu.css'

const ExploreMenu=({category,setCategory})=> {

    const [menu_list, setMenuList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [apiError, setApiDError] = useState(false);
  const fetchData = async () => {
    try {
        const response = await axios.get("https://teamachievers-1.onrender.com/getmenulist", {
            headers: {
                authentication: "Bearer " + localStorage.getItem("token")
            }
        })
        console.log(response);
        setMenuList(response.data)
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

  return (
    <div className='explore-menu' id="explore-menu">
        <h1>Explore our menu</h1>

        <p className='explore-menu-text'>Dive into a world of culinary innovation with our chef's special creations, showcasing the finest seasonal ingredients sourced locally and globally.</p>
         
         <div className="explore-menu-list"> 
            {menu_list.map((item,index)=>{
              return (
              <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}
               className="explore-menu-list-item">
               <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
               <p>{item.menu_name}</p>
               </div>  
               )   
            })}
         </div>
         
         <hr />
      
    </div>
  )
}

export default ExploreMenu
