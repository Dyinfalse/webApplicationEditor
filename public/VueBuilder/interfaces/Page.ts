import Element from './Element';

export default interface Page {
    path: string;
    name: string;
    vue: string;
    style: CSSStyleDeclaration;
    elements: Array<Element>
}