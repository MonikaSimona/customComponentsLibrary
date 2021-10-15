import { TooltipProps } from './TooltipProps';
import styled from "styled-components";




export const TooltipWrapper = styled.div`
    width: fit-content;
    height: fit-content;
    position: relative;
`
export const TooltipElement = styled.span<TooltipProps>`
    transition:0.3s;
    position: absolute;
    z-index: 9999;
    display: inline-block;
    width: fit-content;
    text-align: center;
    height: auto;
    border-radius: 5px;
    padding: 10px 5px;
    line-height: 1;
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
  
    ${({ position }) => position === "top center" ? `
            top:-20px;
            left: 50%;
            transform: translateX(-50%);
      ` : position === "top right" ? `
            top:-20px;
            right:0;
      ` : position === "top left" ? `
            top:-20px;
            left:0;
      ` : position === "bottom center" ? `
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
      `: position === "bottom left" ? `
            bottom: -20px;
            left: 0;
      `: `
            bottom: -30px;
            right: 0;
      `}


`