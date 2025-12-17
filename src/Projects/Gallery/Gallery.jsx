import { useState, useEffect } from "react";
import axios from "axios";
import Image from "./Image";

export default function Gallery(){
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);

    useEffect(() => {
        let cancelled = false;
        
        async function loadImages() {
    try {
                const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=50`);
                if (!cancelled) {
      setImages(res.data);
      console.log(res.data);
                }
    } catch (err) {
                if (!cancelled) {
      console.error("loading problem:", err);
      setImages([]);
    }
  }
        }
        
        loadImages();
        
        return () => {
            cancelled = true;
        };
    }, [page]);
    return(
        <div className="parent">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
            {
                      images.map(img => (
                          <Image image={img} key={img.id} />
                      ))
            }
           </div>
            <div className="buttons">
                <button onClick={()=>{setPage(page!==0?page-1:page)}}>prev</button>
                <button onClick={()=>{setPage(page!==0?page+1:page)}}>next</button>
            </div>
        </div>
    )
}