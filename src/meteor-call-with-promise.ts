import {Meteor} from './meteor-import';

export default function meteorCallWithPromise<TResult>(name, ...args) {
  return new Promise<TResult>((resolve, reject) => {
    Meteor.call(name, ...args, function (err, result) {
      if (err) { reject(err); }
      else { resolve(result); }
    });
  });
}
