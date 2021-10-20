import { rgba } from 'polished';
import { CarouselItemProps } from './CarouselProps';
import styled from "styled-components";

export const CarouselWrapper = styled.div`

    position: relative;
    display: flex;
    justify-content: center;
    align-items:center;
    min-height: 50vh;
    width: 100%;
    /* max-width: 768px; */
    overflow-x: hidden;
    /* background-color: rgba(255,255,255,0.1);
    border-radius:5px*/
    
    padding: 10px;

`
export const LeftArrowWrapper = styled.div`
position: absolute;
  top: 50%;
  left: 7%;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  z-index:9999;
  

`
export const RightArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 7%;
  font-size: 2rem;
  cursor: pointer;
  color:white;
  z-index:9999;



`




export const CarouselItemWrapper = styled.div<CarouselItemProps>`

    transition: 1s;
    opacity: 0;
    ${({ whichArrow, active }) => whichArrow === "left" ? `
    //   transform: translateX(-100%);
      ${active && `
          
          opacity:1;
        //   transform:translateX(0);
  
      `}

    
    ` : `
    
    // transform: translateX(100%);
    ${active && `
        
        opacity:1;
        // transform:translateX(0);
    `}
    
    `}
  


`
export const CarouselItem = styled.div`

    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

`
//carousel with images
export const CarouselImage = styled.img`
    
    min-width: 500px;
    height: 400px;
    object-fit: cover;
    object-position: center center;
    border-radius: 5px;
   
 

`

//indicators 
export const CaroselIndicatorsWrapper = styled.div`

    position: absolute;
    bottom: 0;
    width: fit-content;
    margin-left: auto;



`
export const CarouselIndicator = styled.span<CarouselItemProps>`
    transition: 0.3s;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.active ? rgba(255, 255, 255, 1) : rgba(255, 255, 255, 0.5)};
    margin: 0 5px;
    cursor: pointer;

`
