import MyClass from './class'

let inst = new MyClass();

inst.hello("John").then(greeting => console.log(greeting));
inst.puke().then(null, error => console.error(error.message));
