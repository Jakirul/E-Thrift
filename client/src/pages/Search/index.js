import React, { useState, useEffect } from 'react';
import { Mapbox, NavBar, CatBar,  SearchBar } from '../../components';
import ProductCard from '../../components/productCard';
import { getSearch } from "../../helpers/requests";

function Search() {
  const [category, setCategory] = useState([])
  const [result, setResult]=useState(getSearch.result)
  const [map, setMap] = useState()
  const [mapboxgl, setMapboxgl] = useState()
 
 
  const handleMap = (map) => {
    setMap(map)
  }

  const setMapboxGl = (map) => {
    setMapboxgl(map)
  }
  
  let length = category.data && category.data.length

  return (
    <div>
        {/* <NavBar /> */}
        <Mapbox setMap={handleMap} setMapboxGl={setMapboxGl}/>
        <SearchBar setCategory={setCategory} />
       
        <CatBar setCategory={setCategory} />
        <h3>Results count - {length}</h3>
        <ProductCard category={category} map={map} mapboxgl={mapboxgl}/>
    </div>
    );
}

export default Search;