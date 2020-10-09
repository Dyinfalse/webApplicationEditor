import Submenu from '../interfaces/Submenu';
import File from '../utils/File';

export default class NavBuilder extends File {

    navConfig: Array<Submenu> = [];

    constructor(navConfig: Array<Submenu>) {
        super();
        this.navConfig = navConfig;
    }

    start(): void {
        this.write(this.targetRoot + '/src/components/menuConfig.json', this.json(this.navConfig));
    }
}