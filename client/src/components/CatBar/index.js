import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AiFillSkin, AiFillShopping, AiTwotoneCustomerService, AiTwotoneExperiment, AiTwotoneGift } from 'react-icons/ai';
export const CatBar = ({setCategory}) => {
    const [cat, setCat] = useState('All')
  
    useEffect(() => {
        const getCategory = async () => {
            if (cat == 'All') {
                const cat = await fetch(`http://127.0.0.1:8000/items/get_unclaimed/`)
                const jsonCat = await cat.json();
                return jsonCat
                // setCat(jsonCat)
               
            } else {
                const cate = await fetch(`http://127.0.0.1:8000/items/get_by_category_unsold/${cat}/`)
                const jsonCat = await cate.json();
                return jsonCat
                // setCat(jsonCat)
            }
        }
        (async () => {
            const data = await getCategory();
            setCategory(data)
        })()
    }, [cat])
    
  return (
    <div className='cat_container' id='categories'>
        <Stack direction='row' spacing={2}>
            {/* <Link to='/categories/all'> */}
                <Button variant='text' onClick={() => setCat("All")}><AiFillShopping/>All</Button>
            {/* </Link>
            <Link to='/categories/clothes'> */}
                <Button variant='text'  onClick={() => setCat("Clothes")}><AiFillSkin/>Clothes</Button>
            {/* </Link>
            <Link to='/categories/furniture'> */}
                <Button variant='text' onClick={() => setCat("Furniture")}>Furniture</Button>
            {/* </Link>
            <Link to='/categories/entertainment'> */}
                <Button variant='text' onClick={() => setCat("Entertainment")}><AiTwotoneCustomerService/>Entertainment</Button>
            {/* </Link>
            <Link to='/categories/misc'> */}
                <Button variant='text' onClick={() => setCat("Mischelaneous")}><AiTwotoneExperiment/>Mischelaneous</Button>
            {/* </Link>
            <Link to='/categories/ornaments'> */}
                <Button variant='text' onClick={() => setCat("Ornaments")}><AiTwotoneGift/>Ornaments</Button>
                <Button variant='text' onClick={() => setCat("Other")}><AiTwotoneGift/>Other</Button>
            {/* </Link> */}
        </Stack>
    </div>
    );
};
export default CatBar;
