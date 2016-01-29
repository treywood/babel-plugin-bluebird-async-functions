import Promise from 'bluebird';
import 'babel-polyfill';

let pingPong = {
  async go(times) {
    this.ping = async () => Promise.resolve("ping").delay(500);
    this.pong = async () => Promise.resolve("pong").delay(500);

    for (let i = 0; i < times; i++) {
      if (i % 2 === 0) {
        await this.ping().then(v => console.log(v));
      } else {
        await this.pong().then(v => console.log(v));
      }
    }
  }
}

pingPong.go(10);
