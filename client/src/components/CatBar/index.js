import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AiFillSkin, AiFillShopping, AiTwotoneCustomerService, AiTwotoneExperiment, AiTwotoneGift } from 'react-icons/ai';
import axios from 'axios';

export const CatBar = ({setCategory}) => {

    const [cat, setCat] = useState('All')
  
    useEffect(() => {
        const getCategory = async () => {

            if (cat == 'All') {
                try{
                    const {data} = await axios.get(`http://127.0.0.1:8000/items`)
                    return data
                }
                catch(e){
                    console.warn(e)
                }

                // setCat(jsonCat)
               
            } else {
                try{
                    const {data} = await axios.get(`http://127.0.0.1:8000/items/get_by_category/${cat}/`)
                    return data
                }catch(e){
                    console.warn(e)
                }
                // setCat(jsonCat)
            }
        }
        (async () => {
            const data = await getCategory();
            setCategory(data)
        })()

    }, [cat])
    

  return (
    <div aria-label = 'cat_container' className='cat_container' id='categories'>

        <Stack direction='row' spacing={2}>
                <Button aria-label='all' variant='text' onClick={() => setCat("All")}><AiFillShopping/>All</Button>
                <Button aria-label='clothes' variant='text'  onClick={() => setCat("Clothes")}><AiFillSkin/>Clothes</Button>
                <Button aria-label='furniture' variant='text' onClick={() => setCat("Furniture")}>Furniture</Button>
                <Button aria-label='entertainment' variant='text' onClick={() => setCat("Entertainment")}><AiTwotoneCustomerService/>Entertainment</Button>
                <Button aria-label='mis' variant='text' onClick={() => setCat("Mischelaneous")}><AiTwotoneExperiment/>Mischelaneous</Button>
                <Button aria-label='orn' variant='text' onClick={() => setCat("Ornaments")}><AiTwotoneGift/>Ornaments</Button>
        </Stack>


    </div>
    );
};

export default CatBar;
