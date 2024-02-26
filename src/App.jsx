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

  
  //const url1 = 'https://api.hgbrasil.com/weather?key=11ba5c27&lat=-22.895&lon=-47.0439&user_ip=remote'

  useEffect(() => {
    const fetchData = async () => {
      try {
          // Fetch IP address
          const ipifyRes = await axios.get("https://api.ipify.org");
          const ip = ipifyRes.data;
          setIp_1(ip);

          // Fetch data from apiip.net using the obtained IP
          const apiipRes = await axios.get(`https://apiip.net/api/check?ip=${ip}&accessKey=56dbc36e-1938-4e90-814a-f8c7a71ca666`);
          const data = apiipRes.data;
          setData_1(data);

          console.log(data)

          // Fetch water data using specific coordinates from apiip.net
          const waterRes = await axios.get(`https://isitwater-com.p.rapidapi.com/?latitude=${data.latitude}&longitude=${data.longitude}`, {
              headers: {
                  'X-RapidAPI-Key': 'a573deb46bmsh6f335eb062c7fb8p112558jsn5a6614cecfbf',
                  'X-RapidAPI-Host': 'isitwater-com.p.rapidapi.com'
              }
          });
          const waterData = waterRes.data;
          setWater(waterData.water);
          axios.get(`https://api.hgbrasil.com/weather?key=11ba5c273&lat=${data.latitude}&lon=${data.longitude}&user_ip=remote`)
          .then(response => setCondition(response.data.data.results.condition_slug))
          .catch(err => console.log(err));

      } catch (err) {
          console.log(err);
      }
  };

  fetchData();

  }, []);  
    
  return (
    <>
      <div className='container'>
        <Title title="IP do Computador" />
          <input disabled  className='large'  value={"IP          " + ip_1} onChange={() => console.log("")} />
        <Title title="Dados do usuario" />
          <div className='container_data'>
            <input disabled className='large' value={"Cidade   " + data_1?.city} onChange={() => console.log("")} />
            <input disabled className='large'value={"UF         " + data_1?.regionCode} onChange={() => console.log("")} />
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
        <Title title="Está muito calor ?" />
        <div className='fundo'>
            <a 
            href="" 
            data-tooltip-id="tootip"
            data-tooltip-content={condition == 'clear_day' ? "Muito" : "Pouco"}
            data-tooltip-place="right">
            <img src={`https://assets.hgbrasil.com/weather/icons/conditions/${condition}.svg`} alt="" />  
            </a>      
        </div>
      </div>
      
    </>
  )
}

export default App
