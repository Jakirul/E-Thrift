import React, {useState, useEffect} from 'react';
import CLaimedItemCard from '../ClaimedItemCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './style.css';

const ClaimedItems = ({ setActiveFragment, claimedItems, isLoading }) => {

    
    const [image, setImage] = useState([])
  
  
  useEffect(() => {
    const fetchData = async () => {

      setImage(claimedItems.image)
      
    }

    fetchData()
  }, [claimedItems])

    const renderItems = claimedItems.data && claimedItems.data.map((item, key) => { 
        
        return (
            <CLaimedItemCard 
                id={item.id}
                seller={item.seller}
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                image={image}
                key={key}
            />
        )
    });

    return (
        <>
            <div className="active-items-header">
                <ArrowBackIcon className="go-back-btn" onClick={() => setActiveFragment("")} />
            <h2>Claimed Items</h2>
        </div>
            {isLoading &&
                <div className='loading-listings'>
                    ...loading
                </div>
            }
            {!isLoading && (
                <div className="claimed-items-container">
                    
                    {renderItems}
            </div>
            )
                
            }
        </>
    )
}

export default ClaimedItems;