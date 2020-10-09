import MenuItem from './MenuItem';

export default interface Submenu {
    id: bigint;
    text: string;
    menuItems: Array<MenuItem>
}