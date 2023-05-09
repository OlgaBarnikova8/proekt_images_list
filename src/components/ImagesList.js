import { useState, useEffect } from "react";
import axios from "axios";

function getPhotos(page = 1, limit = 10) {
    return axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      .then((response) => response.data);
  }

const ImagesList = () => {
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);    
    
    useEffect(() => {  
        getPhotos(page)                    
          .then(data => { 
            setImages((prevValue) => [...prevValue, ...data]);           
            setLoading(false);  
          })      
    }, [page]);
    

    if (isLoading) {
        return <p>Loading...!</p>
    }

    const handleClick = () => {
        setLoading(true);
        setPage((prevValue) => ++prevValue);
    };

    return (
        <>
          <div className="container__photos">
            {images.map(({ id, download_url: url, author: alt }) => (          
            <img key= {id} src={url} alt={alt} className="photos" />  
            ))}            
        </div>
        <button onClick={handleClick} className="btn">Show more</button>       
        </>    
    )
};

export default ImagesList;
