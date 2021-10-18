import React, { ComponentProps } from 'react'
import { PageContentWrapper, PaginationComponent, PaginationWrapper } from './Pagination.styled'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import { PaginationProps } from './PaginationsProps'


export const Pagination: React.FC<PaginationProps> = ({ children, pageCount, currentPage, clickedPageNumber }) => {
    const pageElements = [];
    for (let index = 1; index <= pageCount / 5; index++) {
        pageElements.push(<PaginationComponent key={index} active={currentPage === index} onClick={() => clickedPageNumber(index, pageCount)}>{index}</PaginationComponent>)

    }
    return (
        <PageContentWrapper>
            {children}
            <PaginationWrapper>
                <PaginationComponent arrow={true} onClick={() => clickedPageNumber(currentPage - 1, pageCount)} >
                    <BsArrowLeftSquareFill />
                </PaginationComponent>
                {pageElements}
                .   .   .
                <PaginationComponent active={currentPage === pageCount} onClick={() => clickedPageNumber(pageCount, pageCount)}>{pageCount}</PaginationComponent>
                <PaginationComponent arrow={true} onClick={() => clickedPageNumber(currentPage + 1, pageCount)}>
                    <BsArrowRightSquareFill />
                </PaginationComponent>
            </PaginationWrapper>
        </PageContentWrapper>
    )
}