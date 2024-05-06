interface Data {
    name: string;
    age: number;
    sex: boolean;
}
type Option<T extends object> = {
    readonly [key in keyof T]?: T[key];
};
export declare namespace Test2 {
    let obj2: Option<Data>;
}
export {};
