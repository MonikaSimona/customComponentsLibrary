import { useState } from "react";

const usePagination = () => {
    const [statePageNumber, setPageNumber] = useState<number>(1);
    const [start, setStart] = useState(false)
    function clickedPageNumber(pageNumber: number, maxElementsCount: number) {
        if (pageNumber > maxElementsCount || pageNumber < 1) {
            return;
        }
        setPageNumber(pageNumber)
        setStart(true);
        console.log("usePagination:", pageNumber);

    }
    return { clickedPageNumber, statePageNumber, start }
}

export default usePagination;