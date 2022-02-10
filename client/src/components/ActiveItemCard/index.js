import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import './style.css';

    
    
function ActiveItemCard({
  id,
  name,
  price,
  category,
  description,
  image_url,
  image_id,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/view/${id}`)
}

  return (
    <div className="active-card-wrapper">
      <Card
        sx={{ width: '100%' }}
        onClick={handleCardClick}
        aria-label="active-item-card"
      >
        <CardMedia
          component="img"
          height="180"
          image={`https://res.cloudinary.com/deizaqii7/${image_url}`}
          alt="item-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">More Details</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ActiveItemCard;
