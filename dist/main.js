"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_import_1 = require("./meteor-import");
var meteor_call_with_promise_1 = require("./meteor-call-with-promise");
var allMethods = {};
exports.allMethods = allMethods;
var AbstractMethod = (function () {
    function AbstractMethod(name, methodToRun, simulateOnClient) {
        if (simulateOnClient === void 0) { simulateOnClient = false; }
        this.name = name;
        this.methodToRun = simulateOnClient ? methodToRun : this.makeServerOnly(methodToRun);
        meteor_import_1.Meteor.methods((_a = {},
            _a[this.name] = this.methodToRun,
            _a));
        allMethods[this.name] = this;
        var _a;
    }
    AbstractMethod.prototype.call = function (_data) {
        return _data === undefined
            ? meteor_call_with_promise_1.default(this.name)
            : meteor_call_with_promise_1.default(this.name, _data);
    };
    AbstractMethod.prototype.makeServerOnly = function (method) {
        return function (data) {
            if (!meteor_import_1.Meteor.isServer) {
                return undefined;
            }
            return method(data);
        };
    };
    return AbstractMethod;
}());
exports.AbstractMethod = AbstractMethod;
var MethodWithoutArgs = (function (_super) {
    __extends(MethodWithoutArgs, _super);
    function MethodWithoutArgs(name, methodToRun, simulateOnClient) {
        if (simulateOnClient === void 0) { simulateOnClient = false; }
        return _super.call(this, name, methodToRun, simulateOnClient) || this;
    }
    MethodWithoutArgs.prototype.call = function () {
        return _super.prototype.call.call(this);
    };
    return MethodWithoutArgs;
}(AbstractMethod));
exports.MethodWithoutArgs = MethodWithoutArgs;
var Method = (function (_super) {
    __extends(Method, _super);
    function Method(name, methodToRun, simulateOnClient) {
        if (simulateOnClient === void 0) { simulateOnClient = false; }
        return _super.call(this, name, methodToRun, simulateOnClient) || this;
    }
    Method.prototype.call = function (_data) {
        return _super.prototype.call.call(this, _data);
    };
    ;
    return Method;
}(AbstractMethod));
exports.default = Method;
//
// export class Foo<T, TResult> {
//   name: string;
//   methodToRun: (data: T) => TResult;
//
//   constructor(name: string, methodToRun: (data: T) => TResult) {
//     this.methodToRun = methodToRun;
//     this.name = name;
//   }
//
//   call(data: T): Promise<TResult> {
//     return Promise.resolve(this.methodToRun(data));
//   };
// }
//
// // should pass TS validation (and does)
// new Foo('', function (a: string) { return a.length; }).call('');
// new Foo('', function () { return 1; }).call();
//
// // should fail TS validation
// new Foo('', function (a: string) { return a.length; }).call(2);  // fails TS validation, argument of type error
// new Foo('', function (a: string) { return a.length; }).call(); // passes TS validation, causes runtime error (cannot read property length of undefined)
// new Foo('', function () { return 2; }).call(2); // doesn't fail TS validation, but has no effect
//
// export class MethodWithoutArgs<TResult> {
//   hasArgs: boolean;
//   name: string;
//   methodToRun: () => TResult;
//   meteorCall: any;
//
//   constructor(name: string, methodToRun: (() => TResult), hasArgs = true) {
//     this.name = name;
//     this.methodToRun = methodToRun;
//     this.hasArgs = hasArgs;
//
//     Meteor.methods({
//       [this.name]: methodToRun
//     });
//    // allMethods[this.name] = this;
//   }
//
//   call(): Promise<TResult> {
//     //return data ? this.methodToRun(data) : this.methodToRun();
//     //  return (Promise.resolve(1)) as TResult;
//     return meteorCallWithPromise<TResult>(this.name);
//   };
// }
//
//
//
// export class MethodBase {
//   name: string;
//   methodToRun: Function;
//   meteorCall: any;
//
//   constructor(name: string, methodToRun: Function) {
//     this.name = name;
//     this.methodToRun = methodToRun;
//
//     Meteor.methods({
//       [this.name]: methodToRun
//     });
//     //allMethods[this.name] = this;
//   }
//
//   call(data?: any): Promise<any> {
//     //return data ? this.methodToRun(data) : this.methodToRun();
//     //  return (Promise.resolve(1)) as TResult;
//     return meteorCallWithPromise(this.name, data);
//   };
// }
//
// class FooMethod extends MethodBase {
//   call(data: number): Promise<string> {
//     return super.call(data);
//   }
// }
//
// interface myFunction {
//   (a: number): number
// }
// async function a() {
//   let x = await new Method('', function (a: number) { return 2; }).call(1)
//   await new Method('', function (a: string) { return 2; }).call('')
//   await new Method('', function (a: string) { return 2; }).call(2)
//   await new Method('', function (a: string) { return 2; }).call()
//   await new Method('', function () { return 2; }).call()
//   await new Method<undefined, number>('', function () { return 2; }).call()
//   await new Method('', function () { return 2; }).call(2)
// }
//# sourceMappingURL=main.js.map