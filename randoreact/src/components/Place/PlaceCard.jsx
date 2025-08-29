import React from 'react'; 
 
const PlaceCard = ({place}) => { 
     
 
    return ( 
        <div className='placeCard'> 
            <div className='contentPlace'> 
                {place.sprites.front_default ? 
                <img src={place.sprites.front_default} alt={"image de "+ place.name} />: 
                <img src="inconnu.png" alt={"image de "+ place.name} />} 
                 
                <h3>{place.name.toUpperCase()}</h3> 
            </div>   
        </div> 
    ); 
}; 
 
export default PlaceCard;