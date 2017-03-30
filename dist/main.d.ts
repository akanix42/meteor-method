export interface OneOrNoArgFunc<T, TResult> {
    (arg?: T): TResult | void;
}
declare const allMethods: {
    [name: string]: Method<any, any>;
};
export { allMethods };
export declare abstract class AbstractMethod<T, TResult> {
    hasArgs: boolean;
    name: string;
    methodToRun: (data?: T) => TResult;
    meteorCall: any;
    constructor(name: string, methodToRun: (data?: T) => TResult);
    call(_data?: T): Promise<TResult>;
}
export declare class MethodWithoutArgs<TResult> extends AbstractMethod<void, TResult> {
    constructor(name: string, methodToRun: () => TResult);
    call(): Promise<TResult>;
}
export default class Method<T, TResult> extends AbstractMethod<T, TResult> {
    constructor(name: string, methodToRun: (data: T) => TResult);
    call(_data: T): Promise<TResult>;
}
