import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardHeader, ToggleButtonGroup, IconGroup, IconButton, Grid  } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BsFillGeoAltFill } from 'react-icons/bs'
import { TwitterShareButton, TwitterIcon } from "react-share";

//import { LikeButton } from '../likeButton';
import "./productCard.css"

export default function ProductCard({ category, map, mapboxgl }) {

  // required item information: item.id, item.name, item.price, item.category, item.address_id
  // image information: image.image_url, image.image_id
  const [image, setImage] = useState([])
  const [click, setClick] = useState(false)
  const [prodId, setProdId] = useState()
  const [favData, setFavData] = useState([])

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setImage(category.image)
      document.querySelectorAll(".mapboxgl-marker").forEach(map => {
        map.remove()
      })
    }


    fetchData()
  }, [category])

  useEffect(() => {
    const fetchCategoryLiked = async () => {
      const data = await fetch("http://127.0.0.1:8000/favourite/")
      const jsons = await data.json();
      setFavData(jsons)


      // FavoriteIcon
    }

    fetchCategoryLiked()
  }, [])

  let set = new Set()

  const catMap = category.data && category.data?.map((cat, key) => {

    const getCoordinates = async () => {
      let data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cat.address}.json?types=address&access_token=pk.eyJ1IjoiamFraXJ1bGZ4IiwiYSI6ImNreXhrMTZucTA1aTYycXVvbnRyaDR3NGgifQ.zvjCM2eXQNf6ntofj0cwbQ`)
      const jsons = await data.json();

      return jsons.features[0].geometry.coordinates
    }
    (async () => {
      let value = await getCoordinates();

      new mapboxgl.Marker()
        .setLngLat(value)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${cat.name}</h3><p>${cat.description}</p>`))
        .addTo(map.current);


    })()





    let imageString;

    image && image.map((image, key) => {


      if (image.item_id === cat.id && !set.has(image.item_id)) {
        set.add(image)
        imageString = `https://res.cloudinary.com/deizaqii7/${image.img_url}`
        return (
          <div key={key}>
            {"https://res.cloudinary.com/deizaqii7/" + image.img_url}
          </div>
        )
      }
    })


    const clicked = async (e) => {
      setProdId(cat.id)

      const options = {
        method: 'POST',
        headers: { "Content-type": "application/json" },

      }
      const saveFavourite = await fetch(`http://127.0.0.1:8000/favourite/${localStorage.getItem("username")}/${cat.id}/`, options)
      const favJson = await saveFavourite.json()
      setClick(!click)
    }

    return (
      <div key={key} className="cardStyle"> 
      
        <Card 
           sx={{ maxWidth: 345, height: 'Auto' }}
           >

          <CardMedia
            component="img"
            height="140"
            image={imageString}

            alt="item-image"
          />
          <CardContent>

            <Typography gutterBottom variant="h5" component="div">
              <a onClick={() => navigate(`/view/${cat.id}`)}>{cat.name}</a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cat.description}
            </Typography>
            <Typography variant='subtitle.2'>
              {cat.address} <BsFillGeoAltFill />
            </Typography>
          </CardContent>
          <CardActions>
            {/* <IconButton>
            <FavoriteIcon color={data.item_id === cat.id && data.user_id === localStorage.getItem("username") ? 'success' : ''} />
          
          </IconButton> */}

            {/* <LikeButton /> */}


            <Button size="small"><TwitterShareButton
                children={"SHARE TO TWITTER"}
                url={`http://localhost:3000/view/${cat.id}`}
                title={'Check out this '+cat.name+'!'}
              /></Button>
            <Button size="small" onClick={() => navigate(`/view/${cat.id}`)}>More Details</Button>
          </CardActions>
        </Card >
       

      </div >
    )
  })
  return (
    <div className="productCard">
      {Object.keys(category).length > 0 && category.data && category.data.length ?
        catMap
        :
        <h1>No posts yet!</h1>
      }
    </div>

  );
}

