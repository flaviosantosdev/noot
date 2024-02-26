import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import { Title } from './components/Title';
import { WaterIs } from './components/WaterIs';
import { WaterNot } from './components/WaterNot';


function App() {
  const [ip_1, setIp_1] = useState('');
  const [data_1, setData_1] = useState()
  const [water, setWater] = useState(false);
  const [condition, setCondition] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const ipResponse = await axios.get("https://api.ipify.org");
        const ip = ipResponse.data;
        setIp_1(ip);
  
        
        const apiipResponse = await axios.get(`https://apiip.net/api/check?ip=${ip}&accessKey=43231677-f86a-42fd-8626-778b421ba783`);
        const apiipData = apiipResponse.data;
        setData_1(apiipData);
  
        
        const waterResponse = await axios.get(`https://isitwater-com.p.rapidapi.com/?latitude=${apiipData.latitude}&longitude=${apiipData.longitude}&rapidapi-key=462ba44667msh9e867e92dc99d71p1421c6jsn70dc090b1232`);
        setWater(waterResponse.data.water);

        axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=a6ce9019&lat=${data_1?.latitude}&lon=${data_1?.longitude}&user_ip=remote`)
        .then(response => setCondition(response.data.results.condition_slug))
        .catch(err => console.log(err));
  
      } catch (error) {
        console.log(error);
      }
    };
  ''
    fetchData(); 
  
  }, []);
  useEffect(() => {

    axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=a6ce9019&lat=${data_1?.latitude}&lon=${data_1?.longitude}&user_ip=remote`)
        .then(response => setCondition(response.data.results.condition_slug))
        .catch(err => console.log(err));
  },[data_1])

  return (
    <>
      <div className='container'>
        
          <div className='container_ip'>
            <Title title="IP do Computador" />
            <input disabled  className='large'  value={"IP          " + ip_1} onChange={() => console.log("")} />
          </div>
          
         <div className='container_user'>
            <Title title="Dados do usuario" />
            
          
            <div className='container_data'>
              <input disabled className='large' value={"Cidade   " + data_1?.city} onChange={() => console.log("")} />
              <input disabled className='large'value={"UF         " + data_1?.regionCode} onChange={() => console.log("")} />
            </div>
         </div>
         

       
          <div className='waterOrEarth'>
            <Title title="Está na água ?" />  
            {water ? 
              <WaterIs />
              : 
              <WaterNot />      
            }
         
          </div> 
        <Tooltip id="tootip" style={{ width:"124px",height:"48px", backgroundColor: "#000000",opacity:1, color: "#ffffff", fontWeight:"normal", borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center" }} />
        
        
        <div className='container_sun'>
        <Title title="Está muito calor ?" />
          <div className='card_sun'>
              <a 
              href="" 
              data-tooltip-id="tootip"
              data-tooltip-content={condition == 'clear_day' ? "Muito" : "Pouco"}
              data-tooltip-place="right">
              <img src={`https://assets.hgbrasil.com/weather/icons/conditions/${condition}.svg`} alt="" />  
              </a>      
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
