export default interface Data {
    src ?: string;
    value ?: string;
    options ?: Array<{ name: string, value: string }>;
    columns ?: Array<any>;
}