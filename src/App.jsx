
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [ip_1, setIp_1] = useState('');
  const [data_1, setData_1] = useState()
  const [water, setWater] = useState(false);

  useEffect(() => {
    fetch("https://api.ipify.org")
      .then((res) => res.text())
      .then(ip => setIp_1(ip))
      .catch(err => console.log(err))

     fetch(`https://apiip.net/api/check?${ip_1}&accessKey=4024c8c8-3014-4bce-b5d3-0d1a990a101e`) 
      .then((res) => res.json())
      .then(data => setData_1(data))
      .catch(err => console.log(err))

      const url = `https://isitwater-com.p.rapidapi.com/?latitude=41.9029192&longitude=-70.2652276`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'a573deb46bmsh6f335eb062c7fb8p112558jsn5a6614cecfbf',
          'X-RapidAPI-Host': 'isitwater-com.p.rapidapi.com'
        }
      };

       fetch(url, options)
       .then((res) => res.json())
       .then(data => setWater(data.water))
        

       axios.get(`https://api.hgbrasil.com/weather?key=11ba5c27&lat=-22.895&lon=-47.0439&user_ip=remote`)
       .then(res => res.json())
       .then(data => console.log(data))
      
      
       console.log(data_1)
      
  }, [ip_1])

  return (
    <>
      <div>
        <h4>IP do Computador</h4>
        <input value="IP" onChange={() => console.log("")} />
        <input value={ip_1} onChange={() => console.log("")} />

        <h4>Dados do usuario</h4>
        <input value="Cidade" onChange={() => console.log("")} />
        <input value={data_1?.city} onChange={() => console.log("")} />
        <input value="UF" onChange={() => console.log("")} />
        <input value={data_1?.regionCode} onChange={() => console.log("")} />

        Está na água ? {water ? <div> <button >Sim Molhado</button><button>Não</button></div> 
                              :  <div> <button >Sim</button><button>Não</button></div>
                      }
        <h4>Está muito calor ?</h4>
        <div>

        </div>
      </div>
      
    </>
  )
}

export default App
