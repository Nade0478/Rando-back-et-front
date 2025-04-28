import React from 'react'; 
import '../../styles/style-card.css'
 
const CardPlace = ({map}) => { 
     
            return (
                <div className="card">
                  <div className="card-header">
                    <h2>Title</h2>
                  </div>
                  <div className="card-body">
                    <p>Content</p>
                  </div>
                  <div className="card-footer">
                    <button>Read More</button>
                  </div>
                </div>
              );
            };  
 
export default CardPlace; 