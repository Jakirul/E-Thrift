import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './ShowPage.css'

const ShowPage = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [image, setImage] = useState([])
    const [error2, setError2] = useState()
    const [success, setSuccess] = useState()
    const [success2, setSuccess2] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0.1276);
    const [lat, setLat] = useState(51.5072);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        const getById = async () => {
            const data = await fetch(`http://127.0.0.1:8000/items/get_by_id/${id}`);
            console.log(data)

            if (data.status === 500) {
                navigate("/")
            }
            const dataJson = await data.json();
            console.log(dataJson)
            setData(dataJson.data)
            setImage(dataJson.photo)
        }

        getById()
    }, [])

    useEffect(() => {
        const getCoordinates = async () => {
            console.log(data.address)
            let datas = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.address}.json?types=address&access_token=pk.eyJ1IjoiamFraXJ1bGZ4IiwiYSI6ImNreXhrMTZucTA1aTYycXVvbnRyaDR3NGgifQ.zvjCM2eXQNf6ntofj0cwbQ`)
            const jsons = await datas.json();
            console.log(jsons.features[0].geometry.coordinates)
            return jsons.features[0].geometry.coordinates
        }
        (async () => {
            let value = await getCoordinates();
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [value[0], value[1]],
                zoom: zoom
            });

            map.current.addControl(new mapboxgl.NavigationControl());
            new mapboxgl.Marker()
                .setLngLat(value)
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3>${data.name}</h3> <p>${data.description}</p>`))
                .addTo(map.current);

        })()
    }, [data])

    const removePost = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this post?") === true) {

            const data = {
                "id": e.target[0].name
            }

            let options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json" },
            };

            const datas = await fetch("http://127.0.0.1:8000/products/delete", options)
            const jsons = await datas.json();

            if (jsons.Success) {
                setError()
                setSuccess("Successfully deleted a post!")
                setTimeout(() => {

                    navigate("/")
                }, 900)


            } else {
                setSuccess()
                setError("Could not delete a post - please try again later")
            }
        }

    }

    const claimItem = async (e) => {
        e.preventDefault();

        const datas = {
            "username": localStorage.getItem("username")
        }

        let options = {
            method: "POST",
            body: JSON.stringify(datas),
            headers: { "Content-type": "application/json" },
        };

        const claim = await fetch(`http://127.0.0.1:8000/products/claim/${data.id}`, options)
        const claimJson = await claim.json();
        console.log(claimJson)
        if (claimJson.Error) {
            setSuccess2()
            setError2("Cannot claim this item")
        } else {
            setSuccess2("Successfully claimed item")
            setError2();
            setTimeout(() => window.location.reload(), 500)
        }
    }

    let imageString
    return (
        <div className="ShowPage">
            <div>
                <h1>{data.name}</h1>
                {image && image.length
                    ?
                    image && image.map((image, key) => {
                        
                          imageString = `https://res.cloudinary.com/deizaqii7/${image.img_url}`
                          return (
                            <div key={key}>
                              <img src={"https://res.cloudinary.com/deizaqii7/" + image.img_url} />
                            </div>
                          )
                        
                      })
                    :
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/No_image_preview.png" />
                }

                {data.created_by === localStorage.getItem("username")
                    ?
                    <div className="buttons">
                        <button onClick={() => navigate(`/update/${data.id}`)}>Update Listing</button>
                        <form method="POST" onSubmit={removePost}>
                            <input type="submit" name={data.id} value="Delete Post" />
                        </form>
                    </div>
                    :
                    null
                }
                <p>Description</p>
                <textarea defaultValue={data.description} readOnly disabled></textarea>
                <p className="error">{error}</p>
                <p className="success">{success}</p>



            </div>

            <div>
                <p onClick={() => navigate(`/profile/` + data.created_by)}><span>Username:</span> {data.created_by}</p>
                <p><span>Location:</span> {data.location}</p>

                {!data.sold && data.created_by !== localStorage.getItem("username") && localStorage.getItem("username") && localStorage.getItem("authTokens")
                    ?
                    <div className="button-list">
                        <form onSubmit={claimItem}>
                            <button type="submit">Claim Item</button>
                        </form>
                        <button>Message Seller</button>
                    </div>
                    :
                    null
                }
                {data.sold && data.claimed_by === localStorage.getItem("username")
                    ?
                    <div>
                        <p style={{fontWeight: "bold", textAlign: "center"}}>Congrats, you've claimed this item!</p>
                    </div>
                    :
                    null
                }




                <p className="success" style={{ textAlign: "center" }}>{success2}</p>
                <p className="error" style={{ textAlign: "center" }}>{error2}</p>


                <div ref={mapContainer} className="map-container" />

            </div>
        </div>
    )
}

export default ShowPage;









