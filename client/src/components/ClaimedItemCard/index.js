import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ClaimedItemCard({
  id,
  name,
  seller,
  price,
  category,
  description,
  image_url,
  image_id,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate;

  const handleShowDetails = () => {
    navigate(`/product-show/:${id}`);
  };

  return (
    <div className="claimed-card-wrapper">
      <Card role="card" sx={{ maxWidth: 345 }} onClick={handleShowDetails}>
        <CardMedia
          component="img"
          height="140"
          image={`https://res.cloudinary.com/deizaqii7/${image_url}`}
          alt="item-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {showDetails && (
            <>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography variant="subtitle.2" color="text.secondary">
                {seller}
              </Typography>
              <Typography variant="subtitle.2" color="text.secondary">
                {price}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button
            size="small"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            More Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ClaimedItemCard;
