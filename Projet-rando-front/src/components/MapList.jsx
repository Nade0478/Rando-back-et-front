import React, { useEffect, useState } from 'react'; 
import axios from "axios"; 
import Card from './Card';
 
const MapList = () => { 
    // Déclare une nouvelle variable d'état 
    const [maps, setMaps] = useState([]); 
   
    useEffect(() => { 
      axios 
        .get("https://apicarto.ign.fr/api/doc/nature.yml") 
        .then((res) => { 
            for (let i = 0; i < res.data.results.length; i++) { 
                axios.get(res.data.results[i].url) 
                    .then(result =>  
                        setMaps(prevArray => [...prevArray, result.data]) 
                    ) 
            } 
        }) 
    }, []); 
 
    return ( 
        <div className='mapList'> 
        {maps.map((map, index) => ( 
        <Card key={index} map={map} /> 
        ))} 
        </div> 
        ); 
}; 
 
export default MapList;