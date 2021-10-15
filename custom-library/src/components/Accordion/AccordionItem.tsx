import React, { useState } from 'react'
import { AccordionItemContainer, AccordionContent, AccordionHeader, AccordionTitle, AccordionToggle } from './Accordion.styled'
import { AccordionItemData } from './AccordionProps'



export const AccordionItem: React.FC<AccordionItemData> = ({ children, title, content }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <AccordionItemContainer>
            <AccordionHeader onClick={() => { setIsActive(!isActive) }}>
                <AccordionTitle >
                    {title}
                </AccordionTitle>
                <AccordionToggle>
                    {isActive ? "-" : "+"}
                </AccordionToggle>
            </AccordionHeader>
            {isActive && (
                <AccordionContent>
                    {content}
                </AccordionContent>
            )}
        </AccordionItemContainer>
    )
}
