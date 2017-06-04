import {Meteor} from './meteor-import';

import meteorCallWithPromise from './meteor-call-with-promise';
export interface OneOrNoArgFunc<T, TResult> {
  (arg?: T): TResult | void;
}

const allMethods: { [name: string]: Method<any, any>; } = {};
export { allMethods };

export abstract class AbstractMethod<T, TResult> {
  hasArgs: boolean;
  name: string;
  methodToRun: (data?: T) => TResult;
  meteorCall: any;

  constructor(name: string, methodToRun: (data?: T) => TResult, simulateOnClient = false) {
    this.name = name;
    this.methodToRun = simulateOnClient ? methodToRun : this.makeServerOnly(methodToRun);

    Meteor.methods({
      [this.name]: this.methodToRun
    });
    allMethods[this.name] = this;
  }

  call(_data?: T): Promise<TResult> {
    return _data === undefined
      ? meteorCallWithPromise(this.name)
      : meteorCallWithPromise(this.name, _data);
  }

  private makeServerOnly(method: (data?: T) => TResult) {
    return function(data?: T): TResult {
      if (!Meteor.isServer) {
        return undefined as any as TResult;
      }
      return method(data);
    }
  }
}

export class MethodWithoutArgs<TResult> extends AbstractMethod<void, TResult> {
  constructor(name: string, methodToRun: () => TResult, simulateOnClient = false) {
    super(name,  methodToRun, simulateOnClient);
  }

  call() {
    return super.call();
  }
}

export default class Method<T, TResult> extends AbstractMethod<T, TResult> {
  constructor(name: string, methodToRun: (data: T) => TResult, simulateOnClient = false) {
    super(name,  methodToRun, simulateOnClient);
  }

  call(_data: T) {
    return super.call(_data);
  };
}

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
