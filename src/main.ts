import meteorCallWithPromise from './meteor-call-with-promise';
export interface OneOrNoArgFunc<T, TResult> {
  (arg?: T): TResult | void;
}

const allMethods: { [name: string]: Method<any, any, any>; } = {};
export { allMethods };

export default class Method<T, TResult, TF extends OneOrNoArgFunc<T, TResult>> {
  name: string;
  methodToRun: TF;
  meteorCall: any;

  constructor(name: string, methodToRun: ((data?: T) => TResult | void) & TF) {
    this.name = name;
    this.methodToRun = methodToRun;

    Meteor.methods({
      [this.name]: methodToRun
    });
    allMethods[this.name] = this;
  }

  call = ((data?: T): TResult | void => {
    return data ? this.methodToRun(data) : this.methodToRun();
    //  return (Promise.resolve(1)) as TResult;
    //  return meteorCallWithPromise(this.name, data);
  }) as TF;

  callP = ((data?: T): Promise<TResult> => Promise.resolve(this.call(data)))
}
async function a() {
  let x = await new Method('', function (a: number) { return 2; }).callP()
}