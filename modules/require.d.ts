// Interface
declare module require {
    export function (requires: string[], f: Function);
    export function (requires: string);
    export function config(require: any);
};

declare module define {
    export function (requires: string[], f: Function);
    export function (f: Function);
};

