import React, {useState, useEffect} from 'react';
// import Carousel from 'react-elastic-carousel'
import Carousel from "react-multi-carousel";
import { useNavigate } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components'
import { Image } from "semantic-ui-react";
import Card from '../../components/Card';
import "../../App.css"
import { breakpoints } from '@mui/system';
import axios from 'axios';

function Home() {

    const [data, setData] = useState([])
    const [img, setImg] = useState([])
    const navigate = useNavigate()
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 }
    ];

    useEffect(() => {
        const getRecentlyViewed = async () => {
            const {data} = await axios.get(`http://127.0.0.1:8000/items/recently_viewed/${localStorage.getItem("username")}/`)
            setData(data.data)
            setImg(data.image)
        }

        getRecentlyViewed()
    }, [])

    // const images = [
    //     "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //     "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    // ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className='home-container'>
            <h1>THRIFT & DONATE.</h1>
            <p> Sell your items here...</p>
            <button onClick={() => navigate('/search')} className="btn btn-success">Find products now</button>
            <img src="../../images/homeImage.png" alt="frontimage" className='homeI' />
            <div className="description">
                <p> Description: E-THRIFT is a....</p>
            </div>
            {localStorage.getItem("username")
                ?
                    <div className='carousel'>
                    <h3>Recently viewed items..</h3>
                    {/* <Carousel breakPoints={breakPoints}>
                        <div className="cardOne">
                            <img src="../../images/homeImage.png" alt="frontimage" /> </div>
                        <div className="cardTwo">
                            <img src="../../images/7683.jpg" alt="chair" /> </div>
                        <Card cardImage="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        
                    </Carousel> */}

                    <Carousel
                        aria-label = 'carousel'
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {img.map(img => {
                            return (
                                <Image
                                    draggable={false}
                                    style={{ width: "100%", height: "80%" }}
                                    src = {`https://res.cloudinary.com/deizaqii7/${img.img_url}`}
                                    onClick={() => navigate(`/view/${img.item_id}`)}
                                />
                            );
                        })}
                    </Carousel>
                    </div>
                :
                    null
            
            }
        </div>
    )
}

export default Home