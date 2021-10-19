import { PageComponent, PaginationProps } from './PaginationsProps';
import styled from "styled-components";

export const PageContentWrapper = styled.div`

max-width: 620px;

position: relative;

`
export const PaginationWrapper = styled.div`

    position: sticky;
    bottom: 0;
    display: flex;
    width: max-content;
    height: auto;
    margin: 20px auto;
    /* background-color: gray; */

    



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
// export const Page = styled.span`
//     margin: 0 10px;
//     cursor: pointer;
//     border: 1px solid gray;
//     padding: 10px;




// `