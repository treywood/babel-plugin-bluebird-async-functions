import 'babel-polyfill';
import MyClass from './class';

let inst = new MyClass();
let numbers = [1,2,3,4,5];

inst.runningTotal(numbers).then(total => console.log(`The grand total is ${total}`));
