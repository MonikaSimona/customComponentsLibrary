import { useState } from "react";

const usePagination = () => {
    const [statePageNumber, setPageNumber] = useState<number>(1);
    function clickedPageNumber(pageNumber: number, pageCount: number) {
        if (pageNumber > pageCount || pageNumber < 1) {
            return;
        }
        setPageNumber(pageNumber)
        console.log(pageNumber);

    }
    return { clickedPageNumber, statePageNumber }
}

export default usePagination;