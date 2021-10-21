export interface CarouselProps {
    slidesData: any[]; //expected to be array of objects
    arrows: boolean;
    typeOfSlides: "images" | "other";
    indicators: boolean;

}
export interface CarouselItemProps {
    active?: boolean;
    whichArrow?: string;
    overlay?: boolean;
}