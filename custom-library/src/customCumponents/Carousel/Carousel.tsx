import React, { useEffect, useState } from 'react'
import { CarouselProps } from './CarouselProps'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { CaroselIndicatorsWrapper, CarouselImage, CarouselIndicator, CarouselItem, CarouselItemWrapper, CarouselWrapper, LeftArrowWrapper, RightArrowWrapper } from './Carousel.styled';



export const Carousel: React.FC<CarouselProps> = ({ children, slidesData, arrows, typeOfSlides, indicators }) => {
    const [current, setCurrent] = useState(0);
    const [arrowToggler, setArrowToggler] = useState("right");
    const [stopSlide, setStopSlide] = useState(false);
    const length = slidesData.length;

    useEffect(() => {
        if (!stopSlide) {
            var timeOutId = setTimeout(() => {
                setArrowToggler("right");
                nextSlide();
            }, 3000)

        }
        return () => {
            clearTimeout(timeOutId);
        }
    }, [current, stopSlide])

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setArrowToggler("right");
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setArrowToggler("left");
    }
    const indicator = (index: number) => {
        setCurrent(index)
    }
    return (
        <CarouselWrapper onMouseOver={() => setStopSlide(true)} onMouseLeave={() => setStopSlide(false)}>
            {arrows && (<>
                <LeftArrowWrapper onClick={prevSlide}>
                    <BsChevronLeft />
                </LeftArrowWrapper>
                <RightArrowWrapper onClick={nextSlide}>
                    <BsChevronRight />
                </RightArrowWrapper>
            </>)}

            {typeOfSlides == "images" && slidesData ? slidesData.map((slide, index) => (

                <CarouselItemWrapper overlay={stopSlide} key={index} active={index === current} whichArrow={arrowToggler}>

                    {index === current && (
                        <CarouselImage src={slide} />
                    )}

                </CarouselItemWrapper>
            )) : slidesData.map((slide, index) => (

                <CarouselItemWrapper overlay={stopSlide} key={index} active={index === current} whichArrow={arrowToggler}>

                    {index === current && (
                        <CarouselItem >
                            {slide}
                        </CarouselItem>
                    )}

                </CarouselItemWrapper>
            ))}


            {indicators && (
                <CaroselIndicatorsWrapper>
                    {slidesData && slidesData.map((slide, index) => (
                        <CarouselIndicator active={current === index} onClick={() => indicator(index)} />
                    ))}
                </CaroselIndicatorsWrapper>
            )}
        </CarouselWrapper>
    )
}
