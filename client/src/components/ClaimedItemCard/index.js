import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TwitterShareButton, TwitterIcon } from "react-share";

function CLaimedItemCard({ id, name, seller, price, category, description, image }) {

  const [showDetails, setShowDetails] = useState(false);
  const [contactDetails, setContactDetails] = useState([])
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const getContactDetails = async () => {
        if (seller == undefined) return
        const details = await fetch(`http://127.0.0.1:8000/user/get_by_username/${seller}`);
        const detailsJson = await details.json();
        setContactDetails(detailsJson)
        
    }
    getContactDetails()
}, [id])


  const handleShowDetails = () => {
    navigate(`/view/${id}`)
  }

  let set = new Set()

  let imageString;

  image && image.map((image, key) => {

    if (image.item_id === id && !set.has(image.item_id)) {
      set.add(image)
      imageString = `https://res.cloudinary.com/deizaqii7/${image.img_url}`
      return (
        <div key={key}>
          {"https://res.cloudinary.com/deizaqii7/" + image.img_url}
        </div>
      )
    }
  })

  const handleToggle = () =>{
    setIsActive(!isActive)
}

  return (
    <Card role ='card' sx={{ maxWidth: 345 }} onClick={handleShowDetails}>
      <CardMedia
        component="img"
        height="140"
        image={imageString}
        alt="item-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <a onClick={() => navigate(`/view/${id}`)}>{name}</a>
        </Typography>
        {showDetails &&
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
        }

      </CardContent>
      <CardActions >
       
        {/* <Button size="small"><TwitterShareButton
          children={"SHARE TO TWITTER"}
          url={`http://localhost:3000/view/${id}`}
          title={'Check out this ' + name + '!'}
        /></Button> */}
        <button onClick={() => navigate(`/view/${id}`)}>View Item</button>
        <button  onClick={() => window.location = `mailto:`+contactDetails.email}>Email Seller</button>
        
        {/* <Button size="small" onClick={() => { setShowDetails(!showDetails) }}>More Details</Button> */}
      </CardActions>
    </Card>
  );
}

export default ClaimedItemCard;

