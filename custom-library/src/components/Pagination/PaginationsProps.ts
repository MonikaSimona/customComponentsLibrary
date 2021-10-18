export interface PaginationProps {
    pageCount: number;
    currentPage: number;
    clickedPageNumber: (pageNumber: number, pageCount: number) => void;

}
export interface PageComponent {
    arrow?: boolean;
    active?: boolean;

}