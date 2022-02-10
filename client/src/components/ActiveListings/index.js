import React, { useState } from "react";
import ActiveItemCard from "../ActiveItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.css";

const ActiveListings = ({ setActiveFragment, activeItems, isLoading }) => {
  const [renderItems, setRenderItems] = useState(null);

  if (renderItems === null) {
    if (activeItems.data) {
      //console.log(activeItems)
      const items = activeItems.data.map((item, index) => {
        console.log(item)
        const img = activeItems.image.find(
          (image) => image.item_id === item.id
        );
        console.log(img)

        return (
          <ActiveItemCard
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            category={item.category}
            description={item.description}
            image_url={img ? img.img_url : null}
            image_id={item.image_id}
          />
        );
      });
      setRenderItems(items);
    }
  }

  return (
    <div className="active-items-fragment">
      <div className="active-items-header">
        <ArrowBackIcon className="go-back-btn" onClick={() => setActiveFragment("")} />
        <h2>Active Items</h2>
      </div>
      {isLoading && <div className="loading-listings">...loading</div>}
      {!isLoading && (
        <div className="active-listings-container">{renderItems}</div>
      )}
    </div>
  );
};

export default ActiveListings;
