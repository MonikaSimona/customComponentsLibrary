export interface TooltipProps {
    message: string;
    bgColor: string;
    textColor: string;
    position: "top center" | "top right" | "top left" | "bottom center" | "bottom right" | "bottom left";
}