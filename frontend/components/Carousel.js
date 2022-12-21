import { useEffect, useState, useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Carousel({slides}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef();

    // Styles
    const slideStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentSlide].url})`,
    }
    const sliderStyle = {
        height: '100%',
        minHeight: '400px',
        position: 'relative',
    }
    const leftArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '10px',
        fontSize: '2rem',
        color: 'black',
        background: 'rgba(255,255,255,0.5)',
        zIndex: 1,
        cursor: 'pointer',
    }
    const rightArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '10px',
        fontSize: '2rem',
        color: 'black',
        background: 'rgba(255,255,255,0.5)',
        zIndex: 1,
        cursor: 'pointer',
    }
    const dotsContainerStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        display: 'flex',

    }
    const dotsStyle = {
        width: '10px',
        height: '10px',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '50%',
        cursor: 'pointer',
        margin: '0 5px',
    }

    const dotsActiveStyle = {
        width: '10px',
        height: '10px',
        background: 'rgba(31,31,31,0.5)',
        borderRadius: '50%',
        cursor: 'pointer',
        margin: '0 5px',
    }

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setCurrentSlide((currentSlide) =>
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
        }, 6000);
    },[]);

    // function
    function nextSlide() {
        setCurrentSlide( currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    }
    function prevSlide() {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }
    return (
        <>
            <div style={sliderStyle}>
                <IconButton aria-label="left" style={leftArrowStyle} onClick={prevSlide}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton aria-label="right" style={rightArrowStyle} onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </IconButton>
                <div style={slideStyle}></div>
                <div style={dotsContainerStyle}>
                    {slides.map((slide, index) => (
                        <div key={{index}} style={ currentSlide === index ? dotsActiveStyle: dotsStyle}
                             onClick={() => {
                                 setCurrentSlide(index);
                             }}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    )

    // const [currentSlide, setCurrentSlide] = useState(0);
    // const length = slides.length;
    // const timeout = useRef(null);
    //
    // useEffect(() => {
    //     const nextSlide = () => {
    //         setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    //     };
    //
    //     timeout.current = setTimeout(nextSlide, 3000);
    //
    //     return function () {
    //         if (timeout.current) {
    //             clearTimeout(timeout.current);
    //         }
    //     };
    // }, [currentSlide, length]);
    //
    // const nextSlide = () => {
    //     if (timeout.current) {
    //         clearTimeout(timeout.current);
    //     }
    //
    //     setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    // };
    //
    // const prevSlide = () => {
    //     if (timeout.current) {
    //         clearTimeout(timeout.current);
    //     }
    //
    //     setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
    // };
    //
    // if (!Array.isArray(slides) || slides.length <= 0) {
    //     return null;
    // }
    //
    // return (
    //     <section className="slider">
    //         <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
    //         <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
    //         {slides.map((slide, index) => {
    //             return (
    //                 <div className={index === currentSlide ? 'slide active' : 'slide'} key={index}>
    //                     {index === currentSlide && (
    //                         <img src={slide.url} alt={slide.title} className="image"/>
    //                     )}
    //                 </div>
    //             );
    //         })}
    //     </section>
    // );
}