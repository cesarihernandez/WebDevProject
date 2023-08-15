import React from 'react';
import "./Carousel.css";
import { images } from '../helpers/CarouselData';
import { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";


function Carousel() {

    // State to keep track of the current image index
    const [currImg, setCurrImg] = useState(0)

    return ( 
        <div className="carousel">
            <div 
            className="carouselInner" 
            style={{ backgroundImage: `url(${images[currImg].img})` }}   
            > 
            {/* Left arrow button to navigate to the previous image */}
            <div 
                className="left" 
                onClick={() => {
                    // Check if current image index is greater than 0 to prevent going below zero
                    currImg > 0 && setCurrImg(currImg - 1);
            }}
            >
                <ArrowBackIosIcon style={{fontSize: 30}} />
            </div>
            {/* Right arrow button to navigate to the next image */}
            <div 
                className="right" 
                onClick={() => {
                    // Check if current image index is less than the total number of images minus 1
                    currImg < images.length -1 && setCurrImg(currImg + 1);
            }}
            >
                <ArrowForwardIosIcon style={{fontSize: 30}} />
            </div>
            </div>
        </div>
    );
}

export default Carousel;

