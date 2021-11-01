export interface PaginationProps {
    currentPage: number;
    maxNumberOfPages: number;
    numberOfPagesOnDisplay: number;
    clickedPageNumber: (pageNumber: number, maxElementsCount: number) => void;
    start: boolean;

}
export interface PageComponent {
    arrow?: boolean;
    active?: boolean;

}