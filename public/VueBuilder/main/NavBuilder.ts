import Submenu from '../interfaces/Submenu';
import File from '../utils/File';

export default class NavBuilder extends File {

    navConfig: Array<Submenu> = [];

    constructor(navConfig: Array<Submenu>) {
        super();
        this.navConfig = navConfig;
    }

    start(targetPath: string): void {
        this.write(targetPath + '/src/components/menuConfig.json', this.json(this.navConfig));
    }
}