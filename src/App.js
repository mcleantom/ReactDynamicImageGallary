import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
  const [images, setImages] = useState([]);
  const [state, setState] = useState({
    showIndex: false,
    showBullets: true,
    infinite: true,
    showThumbnails: true,
    showFullscreenButton: true,
    showGalleryFullscreenButton: true,
    showPlayButton: true,
    showGalleryPlayButton: true,
    showNav: true,
    isRTL: false,
    slideDuration: 450,
    slideInterval: 2000,
    slideOnThumbnailOver: false,
    thumbnailPosition: "bottom",
    showVideo: {},
    useWindowKeyDown: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  function importAll(r) {
    return r.keys().map(r);
  }

  // Fetch images from the public/images folder
  const fetchImages = () => {
    const images = [];
    const imagesContext = require.context("../public/images", true);

    imagesContext.keys().forEach((imagePath) => {
      images.push({
        original: `/images/${imagePath.slice(2)}`,
        thumbnail: `/images/${imagePath.slice(2)}`,
      });
    });

    setImages(images);
  };

  // Fetch images on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      fetchImages();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <ImageGallery
        items={images}
        infinite={state.infinite}
        showBullets={state.showBullets}
        showFullscreenButton={
          state.showFullscreenButton && state.showGalleryFullscreenButton
        }
        showPlayButton={state.showPlayButton && state.showGalleryPlayButton}
        showThumbnails={state.showThumbnails}
        showIndex={state.showIndex}
        showNav={state.showNav}
        isRTL={state.isRTL}
        thumbnailPosition={state.thumbnailPosition}
        slideDuration={parseInt(state.slideDuration)}
        slideInterval={parseInt(state.slideInterval)}
        slideOnThumbnailOver={state.slideOnThumbnailOver}
        additionalClass="app-image-gallery"
        useWindowKeyDown={state.useWindowKeyDown}
        startIndex={currentIndex}
        onSlide={handleImageChange}
      />
    </div>
  );
}

export default App;
