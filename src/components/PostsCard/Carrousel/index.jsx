/* eslint-disable react/prop-types */
import React from "react";
import "./styles.css";
import Slider from "react-slick";

export default function Carrousel({ images }) {
  const hasMultipleImages = images.length > 1;
  // console.log("imagenes desde carr",images)
// console.log("imagenes.path",images[0])
  var settings = {
    dots: true,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "dots"
  };

  return (
    <section className="carrousel-container">
      {hasMultipleImages ? (
        <Slider {...settings}>
          <div className="carrousel-img">
            <img src={images[0]?.path} alt="Image 1" />
          </div>
          {images[1] && (
            <div className="carrousel-img">
              <img src={images[1]?.path} alt="Image 2" />
            </div>
          )}
          {images[2] && (
            <div className="carrousel-img">
              <img src={images[2]?.path} alt="Image 3" />
            </div>
          )}
        </Slider>
      ) : (
        <div className="carrousel-img">
          <img src={images[0]?.path} alt="Single Image" />
        </div>
      )}
    </section>
  );
}
