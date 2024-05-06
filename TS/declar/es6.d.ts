declare let set: Set<number>;
declare let map: Map<string, number>;
declare let obj: {
    a: number;
    b: number;
    [Symbol.iterator]: () => Generator<never, void, unknown>;
};
