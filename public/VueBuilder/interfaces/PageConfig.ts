import Page from './Page';
import Frame from './Frame';
import Submenu from './Submenu';

export default interface PageConfig {
    frame: Frame;
    navConfig: Array<Submenu>;
    pages: Array<Page>;
}