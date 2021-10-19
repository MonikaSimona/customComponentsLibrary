import React, { useEffect, useState } from 'react'
import { PageContentWrapper, PaginationComponent, PaginationWrapper } from './Pagination.styled'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import { PaginationProps } from './PaginationsProps'


export const Pagination: React.FC<PaginationProps> = ({ children, currentPage, clickedPageNumber, maxNumberOfPages, numberOfPagesOnDisplay, start }) => {
    const elements: any = [];
    const [allPagesNum, setAllPagesNum] = useState<number[]>([])
    const [displayPages, setDisplayPages] = useState<number[]>([])



    const pagesToDisplay = (array: number[], clickedPage: number, numberOfPagesShown: number) => {

        const temp: number[] = array;
        const startIndex = clickedPage - 1;
        const endIndex = startIndex + numberOfPagesShown;
        console.log(temp.slice(startIndex, endIndex))

        setDisplayPages(temp.slice(startIndex, endIndex))

    }
    console.log(maxNumberOfPages, numberOfPagesOnDisplay)

    useEffect(() => {
        if (maxNumberOfPages) {
            if (currentPage < numberOfPagesOnDisplay) {
                for (let index = 1; index <= maxNumberOfPages; index++) {
                    elements.push(index)
                }
                setAllPagesNum(elements)
            }
            pagesToDisplay(elements, 1, numberOfPagesOnDisplay);

        }



    }, [])

    useEffect(() => {
        if (start) {
            if (currentPage >= numberOfPagesOnDisplay) {
                const substruct = numberOfPagesOnDisplay - 2;
                pagesToDisplay(allPagesNum, currentPage - substruct, numberOfPagesOnDisplay);
                console.log("bigger than 10", currentPage)
            } else {
                pagesToDisplay(allPagesNum, 1, numberOfPagesOnDisplay)
            }
        }




    }, [currentPage])


    return (
        <PageContentWrapper>
            {children}
            <PaginationWrapper>
                <PaginationComponent arrow={true} onClick={() => clickedPageNumber(currentPage - 1, maxNumberOfPages)} >
                    <BsArrowLeftSquareFill />
                </PaginationComponent>
                {maxNumberOfPages && displayPages.map((element: any, index: number) => (<PaginationComponent key={element} active={currentPage === element} onClick={() => clickedPageNumber(element, maxNumberOfPages)}>{element}</PaginationComponent>))}
                .   .   .
                {maxNumberOfPages > 10 && (
                    <PaginationComponent active={currentPage === maxNumberOfPages} onClick={() => clickedPageNumber(maxNumberOfPages, maxNumberOfPages)}>{maxNumberOfPages}</PaginationComponent>
                )}
                <PaginationComponent arrow={true} onClick={() => clickedPageNumber(currentPage + 1, maxNumberOfPages)}>
                    <BsArrowRightSquareFill />
                </PaginationComponent>
            </PaginationWrapper>
        </PageContentWrapper>
    )
}
