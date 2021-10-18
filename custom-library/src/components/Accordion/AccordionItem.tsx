import React, { RefObject, useEffect, useRef, useState } from 'react'
import { AccordionItemContainer, AccordionContentWrapper, AccordionHeader, AccordionTitle, AccordionToggle, AccordionContent } from './Accordion.styled'
import { AccordionItemData } from './AccordionProps'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'


export const AccordionItem: React.FC<AccordionItemData> = ({ children, title, content, onToggle, active }) => {

    const contentEl = useRef<HTMLDivElement>(null);

    return (
        <AccordionItemContainer>
            <AccordionHeader onClick={onToggle}>
                <AccordionTitle >
                    {title}
                </AccordionTitle>
                <AccordionToggle>
                    {active ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </AccordionToggle>
            </AccordionHeader>

            <AccordionContentWrapper ref={contentEl} active={active} contentHeight={contentEl.current?.scrollHeight}>
                <AccordionContent>
                    {content}
                </AccordionContent>
            </AccordionContentWrapper>

        </AccordionItemContainer>
    )
}
