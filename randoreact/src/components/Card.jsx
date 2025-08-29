import React from 'react'; 
 
const Card = ({map}) => { 
     
 
    return ( 
        <div className='cardMap'> 
            <div className='contentMap'> 
                {map.sprites.front_default ? 
                <img src={map.sprites.front_default} alt={"image de "+ map.name} />: 
                <img src="/public/Assets" alt={"image de "+ map.name} />} 
                 
                <h3>{map.name.toUpperCase()}</h3> 
            </div>   
        </div> 
    ); 
}; 
 
export default Card; 