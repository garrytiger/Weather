import React, { useState } from 'react'
import "./Weather.css"
import img1 from "./weather-icons/search-interface-symbol.png"
import img2 from "./weather-icons/sun.png"
import location from "./weather-icons/location-pointer.png"
import img3 from "./weather-icons/humidity.png"
import img4 from "./weather-icons/wind.png"



export default function Weather() {

const [newcity, setnewcity] = useState("")
const [newweather, setnewweather] = useState({}) 
// const [iconLogo, seticonLogo] = useState('')

console.log(newweather)

function handleChnage(e){
  setnewcity(e.target.value)
}

async function handleClick(){

  const apiKey = "ba5b6f2701c3fe1dd1a726dc0a0c9fe4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&appid=${apiKey}&units=metric`;

  if(newcity){
    fetch(url)
    .then((responce)=>{
      if(!responce.ok){
        throw new Error('api not proper responce')
      }
      return responce.json();
    })
    .then((data)=>setnewweather(data))
    .catch((error)=>{
      console.log(`there was a issue with api fetch oprestion` , error)
    })
  }

}

// function imgschange(){
//   let iconLogo;
//   if(img2.weather[0].main === "clouds"){
//     iconLogo = "./weather-icons/cloudy.png";
//   }
//   else if(img2.weather[0].main === "clear"){
//     iconLogo = "./weather-icons/sun.png";
//   }
//   else if(img2.weather[0].main === "rain"){
//     iconLogo = "./weather-icons/storm.png";
//   }
//   // Add more conditions as needed
  
//   seticonLogo(iconLogo);
// }


  return (
    <div className='card'>

      <div className='search'>
        <img className='loco' src={location} alt='img'/>
        <input type='text' placeholder='city name' onChange={handleChnage} value={newcity}/>
        <button onClick={handleClick} ><img className='img1' src={img1} alt='img'/></button>
      </div>


    {newweather.name && 
    <>
    <div className='weather'>
      <img className='img2' src={img2} alt='img2'/>
      <h2 className='temp'>{(newweather.main && Math.floor(newweather.main.temp))}°</h2>
      <h3 className='fors'> {newweather.weather && newweather.weather[0].description}</h3>
      <h2> {newweather.name && `${newweather.name},`} {newweather.sys && newweather.sys.country}</h2>

      <div className='details'>
        <div className='col'>
        <img className='img4' src={img3} alt='img3'/>
        <div>
          <p className='humidity'>{newweather.main && newweather.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className='col'>
        <img className='img3' src={img4} alt='img4'/>
        <div>
          <p className='wind'>{newweather.wind && newweather.wind.speed}km/h</p>
          <p>Wind</p>
        </div>
        </div>
        
        </div>
      </div>
      </div>
    </>
    }
      
    </div>
  )
}
