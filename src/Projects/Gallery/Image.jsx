import { useState } from 'react';
import './style.css';

export default function Image(props){
    const { image } = props;
    
    // Use useState with lazy initializer to avoid calling Math.random during render
    const [dimensions] = useState(() => ({
        width: Math.floor(Math.random() * (500 - 220 + 1)) + 220,
        height: Math.floor(Math.random() * (300 - 220 + 1)) + 220,
    }));
    
    return(
        <div className="image-item">
            <img 
                src={image.download_url} 
                alt={image.author} 
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                borderRadius: '10px',
                }}
            />
            <h3>{image.author}</h3>
        </div>
    );
}