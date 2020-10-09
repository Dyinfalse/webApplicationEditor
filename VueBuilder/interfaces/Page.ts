import Element from './Element';

export default interface Page {
    path: string;
    name: string;
    vue: string;
    isLogin: boolean;
    style: CSSStyleDeclaration;
    elements: Array<Element>;
}