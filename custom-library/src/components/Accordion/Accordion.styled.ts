
import styled from "styled-components";
import { AccordionItemData } from "./AccordionProps";

export const AccordionWrapper = styled.div`
    position: relative;
    border-radius: 10px;
    width: 500px;
    
`
export const AccordionItemContainer = styled.div`

    
    width: 100%;
    background-color: white;
    color: black;
    


`
export const AccordionHeader = styled.div`
    background-color:white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid rgba(0,0,0,0.5);
    cursor: pointer;
    

`

export const AccordionToggle = styled.span`
    
    font-size: 10px;
`
export const AccordionTitle = styled.div`
    font-weight: 600;

`

export const AccordionContentWrapper = styled.div<AccordionItemData>`
    
    height: 0;
    overflow: hidden;
    transition: height ease 0.3s;
    
    ${({ active, contentHeight }) => active && `
    
    height: ${contentHeight}px;
    
    box-shadow: 0px 11px 12px -5px rgba(0,0,0,0.10) inset;
    
    ` }

`
export const AccordionContent = styled.p`

    padding: 10px;


`