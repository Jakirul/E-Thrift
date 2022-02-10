import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditListing.css"

import axios from 'axios';

const EditListing = () => {
    const [data, setData] = useState([])
    const [photo, setPhoto] = useState([])
    const [error, setError] = useState()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (!localStorage.getItem("username") || !localStorage.getItem("authTokens")) {
            navigate("/")
        }

        const getById = async () => {
            const {data} = await axios.get(`http://127.0.0.1:8000/items/get_by_id/${id}`);
            const dataJson = data;

            if (dataJson.Error || localStorage.getItem("username") !== dataJson.data.seller) {
                navigate("/")
            }

            setData(dataJson.data)
            setPhoto(dataJson.photo)
        }

        getById()
    }, [])

    let checkedCount = 0;
    const EditListing = async (e) => {
        e.preventDefault();

        const form = e.target;
        let formData = new FormData(e.target);
        formData.append("id", id)
        formData.append("name", form.name.value.trim())
        formData.append("description", form.description.value.trim())
        formData.append("address", form.location.value.trim())
        if (e.target.deleteImages) {
                if (e.target.deleteImages.length) {
                    e.target.deleteImages.forEach(count => {
                        
                    if (count.checked) {
                        checkedCount += 1;
                    }
                })
            }
            if (checkedCount > 1) {
                e.target.deleteImages.forEach((image => {

                    let formData2 = new FormData(e.target);
                    formData2.append("id", image.id)
                    formData2.append("image", image.value)
                    if (image.checked) {
                        (async () => {
                            let options1 = {
                                method: "PUT",
                                body: formData2
                            }
                            
                            let fetching = await fetch("http://127.0.0.1:8000/images/delete/", options1);
                            let jsonfetch = await fetching.json();
                            
                        })()
                    }
                }))
            } else {

                let formData3 = new FormData(e.target);
                
                formData3.append("id",  id)
                formData3.append("image",  e.target.deleteImages.value)
                if ( e.target.deleteImages.checked) {
                    (async () => {
                        let options1 = {
                            method: "PUT",
                            body: formData3
                        }
                        let fetching = await fetch("http://127.0.0.1:8000/images/delete/", options1);
                        let jsonfetch = await fetching.json();
                    })()
                }

            }}

        let formData4 = new FormData(e.target)
        formData4.append("image", e.target.image.files)

        let options3 = {
            method: "POST",
            // headers: { 'Content-Type': 'multipart/form-data' },
            // withCredentials: true,
            body: formData4,


        }

        const data2 = await fetch(`http://127.0.0.1:8000/images/add/${id}/`, options3)
        const jsondata = await data2.json()

        let name = form.name.value.trim()
        let description = form.description.value.trim()
        let location = form.location.value.trim()

        if (name.length < 1 || description.length < 1 || location.length < 1) {
            setError("Please fill in the required fields")
        } else {
            setError()

            let options = {
                method: "POST",
                body: formData4,
            };

            await fetch("http://127.0.0.1:8000/items/update", options)
            // navigate(`/view/${id}`)
        }

    }

    return (
        <div className="EditListing">
            {Object.keys(data).length > 0 ?
                <form method="POST" onSubmit={EditListing}>
                    <h1>Update Listing</h1>
                    <div>
                        <label htmlFor="name">Update name</label>
                        <input type="text" defaultValue={data.name} name="name" />
                    </div>

                    <div>
                        <label htmlFor="description">Update description</label>
                        <textarea defaultValue={data.description} name="description"></textarea>
                    </div>

                    <div>
                        <label htmlFor="location">Update location</label>
                        <input type="text" defaultValue={data.address} name="location" />
                    </div>

                    <div>
                        <label htmlFor="image">Update image</label>
                        <input type="file" id="img" name="image" accept="image/*" multiple />
                    </div>

                    <div>


                        {photo && photo.map((photo, key) => {
                            return (
                                <div className="images" key={key}>
                                    <img style={{ width: "150px" }} src={`https://res.cloudinary.com/deizaqii7/` + photo.img_url} className="img-thumbnail" alt="" name="image" />
                                    <input type="checkbox" id={photo.item_id} name="deleteImages" defaultValue={photo.img_url} />
                                    <label htmlFor="image-0">Delete image?</label>
                                </div>
                            )
                        })


                        }
                    </div>

                    <input aria-label='submit' type="submit" value="Update Listing" />
                </form>

                :
                null
            }
            {error}
        </div>
    )
};

export default EditListing;
