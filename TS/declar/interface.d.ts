interface Obj {
    name: string;
    [key: string]: string;
}
interface Obj3 {
    age: string;
}
type Obj2 = {
    name: string;
};
declare let a: Obj;
declare let b: Obj2;
declare let user: Record<string, string>;
