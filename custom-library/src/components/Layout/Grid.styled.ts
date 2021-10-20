import styled from "styled-components";
import { GridProps } from "./GridProps";

const getWidth = (span: number) => {

    if (!span) return;
    let width = span / 12 * 100;
    return `width: ${width}%`;

}

export const Row = styled.div`
box-sizing: border-box;
width: 100%;
padding: 0 10px;
&::after{
    content: "";
    clear: both;
    display: table;
}

`

export const Col = styled.div<GridProps>`

    box-sizing: border-box;
    float: left;
    /* padding: 0 10px; */
    width: 100%;

    ${({ xs }) => xs ? getWidth(xs) : "width: 100%"}


    @media only screen and (min-width:768px){
        ${({ sm }) => sm && getWidth(sm)};
    }

    @media only screen and (min-width:992px){
        ${({ md }) => md && getWidth(md)};
    }

    @media only screen and (min-width:1200px){
        ${({ lg }) => lg && getWidth(lg)};
    }

`