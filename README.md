# Installation
`meteor npm i --save meteor-method'

# Usage

Create a method:
```js
import Method from 'meteor-method';

export default new Method('foo', function(now) {
  return now.getDate();
});
```

Use the method you created:
```js
import fooMethod from './foo';

fooMethod.call(new Date()).then((result) => console.log(result));
// OR, in an async/await style:
(async function() {
  console.log(await fooMethod.call(new Date()));
})();
```

This replaces the traditional way of creating and calling Meteor methods:
```js

// Create a method
Meteor.methods({
  'foo'(now){
    return now.getDate();
  }
});

// Use the method
Meteor.call('foo', new Date());
```
This removes reliance on magic strings and enables type checking if you use TypeScript (see below).

## API 
 `Method#call`: returns a Promise for the result of the callback you passed in when you created the method.

## Notes for TypeScript:
This module comes with typings. Visual Studio Code supports full type inference:
``` typescript
import Method from 'meteor-method';

const fooMethod = new Method('foo', function(now: Date) {
  return now.getDate();
});
fooMethod.call(1); // Error since you are passing a number instead of a date
```

TypeScript currently doesn't support inference if you have 0 arguments, so this will give you an error:
``` typescript
import Method from 'meteor-method';

const fooMethod = new Method('foo', function() {
  return 1;
});
fooMethod.call(); // Error because TypeScript still thinks you should pass an argument.
```

Instead, use the `MethodWithoutArgs` class:
``` typescript
import {MethodWithoutArgs} from 'meteor-method';

const fooMethod = new MethodWithoutArgs('foo', function() {
  return 1;
});
fooMethod.call(); // All good
```
