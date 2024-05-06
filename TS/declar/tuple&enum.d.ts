declare enum Color {
    red = 0,
    green = 1,
    blue = 2
}
declare enum Color2 {
    red = 2,
    green = 3,
    blue = 4
}
declare enum Color3 {
    red = "red",
    green = "green",
    blue = "blue"
}
declare enum Color4 {
    red = 1,
    green = "green",
    blue = "blue"
}
declare enum Color5 {
    red = 0,
    green = 1,
    blue = 2
}
interface Color6 {
    red: Color5.red;
    green: Color5.green;
    blue: Color5.blue;
}
declare const color: Color6;
declare const enum Color7 {
    red = 0,
    green = 1,
    blue = 2
}
declare const color2: Color7;
declare enum Color8 {
    red = 0,
    green = 1,
    blue = 2
}
declare const color3: string;
declare const color4: Color8;
