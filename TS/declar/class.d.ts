interface Options {
    el: string | HTMLElement;
}
interface VueClass {
    options: Options;
    init(): void;
}
interface Vnode {
    tag: string;
    text?: string;
    children?: Vnode[];
}
declare class Dom {
    constructor(name: string);
    private createElement;
    private setText;
    render(data: Vnode): HTMLElement;
}
declare class Vue extends Dom implements VueClass {
    options: Options;
    constructor(options: any);
    init(): void;
}
