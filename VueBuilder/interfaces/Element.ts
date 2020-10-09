import Data from "./Data";

export default interface Element {
    uuid: string;
    name: string;
    style: CSSStyleDeclaration;
    packStyle: CSSStyleDeclaration;
    isBlock: boolean;
    data: Data;
    childElement: Array<Element>
}