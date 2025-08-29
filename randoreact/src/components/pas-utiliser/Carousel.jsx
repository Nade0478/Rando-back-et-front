import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const images = [
    {
      src: "/public/Assets/Images/Home/nature1.jpg",
      caption: {
        title: "Sentier Forêt",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
        imgSrc: "http://127.0.0.1:8000/storage/public/uploads/forest3_1742476627.png",
        imgAlt: "sentier forêt",
      },
    },
    {
      src: "/public/Assets/Images/Home/nature2.jpg",
      caption: {
        title: "Sentier et randonneurs",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imgSrc: "http://127.0.0.1:8000/storage/public/uploads/carte-sarthe_1742480733.jpg",
        imgAlt: "sentier et randonneurs",
      },
    },
    {
      src: "/public/Assets/Images/Home/nature3.jpg",
      caption: {
        title: "Sentier",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
        imgSrc: "http://127.0.0.1:8000/storage/public/uploads/forest4_1742469995.png",
        imgAlt: "sentier",
      },
    },
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={image.src}
            alt={`Slide ${idx}`}
          />
          <Carousel.Caption>
            <h3>{image.caption.title}</h3>
            <img
              src={image.caption.imgSrc}
              alt={image.caption.imgAlt}
              width="75px"
            />
            <p>{image.caption.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
