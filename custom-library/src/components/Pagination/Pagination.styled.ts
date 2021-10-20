import { PageComponent } from './PaginationsProps';
import styled from "styled-components";

export const PageContentWrapper = styled.div`

    max-width: 620px;
    position: relative;

`
export const PaginationWrapper = styled.div`

    position: relative;
    display: flex;
    width: max-content;
    height: auto;
    margin: 20px auto;

`
export const PaginationComponent = styled.span<PageComponent>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid gray;
    border-radius: 5px;
    color: white;
    transition: 0.4s;
    
    &:hover{
        border: rgba(255,255,255,0.9);
        background-color: rgba(255,255,255,0.9);
        color: black;
        ${({ arrow }) => arrow && `
            border:none;
            background-color: transparent;
            color:gray;
    `}
            ${({ active }) => active && `
            border:none;
            background-color: transparent;
            color:gray;
            cursor:auto;
`}
    }

    ${({ arrow }) => arrow && `
            border:none;
            font-size:20px
    `}
    ${({ active }) => active && `
            border:none;
            background-color: transparent;
            color:gray;
    `}


`
