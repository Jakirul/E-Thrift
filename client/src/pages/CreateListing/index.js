import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CreateListing.css"

const CreateListing = () => {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("username") || !localStorage.getItem("authTokens")) {
            navigate("/")
        }
    }, [])

    const newListing = async (e) => {
        e.preventDefault();

        const form = e.target;
        let formData = new FormData(e.target);

        formData.append("name", form.name.value.trim())
        formData.append("description", form.description.value.trim())
        formData.append("address", form.location.value.trim())
        formData.append("created_by", localStorage.getItem("username"))
        formData.append('category', form.category.value)
        formData.append("seller", localStorage.getItem("username"))

        let formData2 = new FormData(e.target)
        formData2.append("image", e.target.image.files)

        let name = form.name.value.trim()
        let description = form.description.value.trim()
        let location = form.location.value.trim()

        if (name.length < 1 || description.length < 1 || location.length < 1) {
            setError("Please fill in the required fields")
        } else {
            setError()
            const data = {
                name: name,
                description: description,
                location: location,
                image: form.image.value,
                created_by: localStorage.getItem("username")
            }

            let options = {
                method: "POST",
                body: formData,
            };

            const datas = await fetch("http://127.0.0.1:8000/items/create", options)
            const jsons = await datas.json();
            
            let split = JSON.stringify(jsons.Success).split("id: ")

            let options2 = {
                method: "POST",
                // headers: { 'Content-Type': 'multipart/form-data' },
                // withCredentials: true,
                body: formData2,


            }

            const data2 = await fetch(`http://127.0.0.1:8000/images/add/${split[1].split('"')[0]}/`, options2)
            const jsondata = await data2.json()

            navigate("/search")

        }
    }

    return (
        <div className="CreateListing">


            <form onSubmit={newListing} encType="multipart/form-data">
                <h1>Create a new listing</h1>
                <div>
                    <label htmlFor="name">Item name</label>
                    <input aria-label='name' type="text" name="name" required placeholder="E.g. Used iPhone 5S" />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea aria-label='desc' name="description" required placeholder="E.g. This phone is in working condition but has light scratches on the edges"></textarea>
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input aria-label='loc' type="text" name="location" required placeholder="E.g. London, United Kingdom" />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        <option value="Clothes">Clothes</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Mischelaneous">Mischelaneous</option>
                        <option value="Ornaments">Ornaments</option>
                    </select>
                </div>


                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id="img" name="image" accept="image/*" multiple />
                </div>

                <input aria-label='sub' type="submit" value="Create new listing" />
            </form>
            <p className="error">{error}</p>
            <p className="success">{success}</p>

        </div>
    )
};

export default CreateListing;
