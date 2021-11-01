export interface AccordionProps {

    accordionData: AccordionItemData[];

}
export interface AccordionItemData {
    title?: string;
    content?: string;
    onToggle?: () => void;
    active?: boolean;
    contentHeight?: number;
}
