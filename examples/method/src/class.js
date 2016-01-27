import Promise from 'bluebird'

export default class MyClass {

  async hello(name) {
    return `Hello ${name}`;
  }

  async puke() {
    throw new Error("REJECT");
  }

}
