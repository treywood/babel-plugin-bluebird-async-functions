import Promise from 'bluebird'

export default class MyClass {

  async runningTotal(numbers) {

      let total = 0;
      for (let i = 0; i < numbers.length; i++) {
        let num = await Promise.resolve(numbers[i]).delay(1000);
        console.log(`${total} + ${num} = ${total + num}`);
        total += num;
      }

      return total;

  }

}
