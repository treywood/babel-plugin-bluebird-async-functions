# babel-plugin-bluebird-async-functions
Convert async methods and generator functions into Bluebird's Coroutine and Method helpers by wrapping methods marked as 'async' with the ```Promise.method``` method, and async generator methods with ```Promise.coroutine```.

# Dependencies
This plugin requires the `babel-plugin-syntax-async-functions` plugin to be loaded before it in order for Babel to properly parse async method definitions:

.babelrc:
```json
{
  "presets": ["es2015"],
  "plugins": [
    "babel-plugin-syntax-async-functions",
    "babel-plugin-bluebird-async-functions"
  ]
}
```

#Example
sample.js
```javascript
class MyClass {

  // async method
  async getData() {  
    return Promise.resolve("data").delay(500);
  }
  
  // async generator
  async getLotsOfData() {
    let datas = [];
    for (let i = 0; i < 10; i++) {
      let datum = await Promise.resolve(i).delay(500);
      datas.push(datum);
    }
    return datas;
  }
}
```

`babel sample.js`:

```javascript
"use strict";

var _createClass = function () { /* Babel create class method */ }();

function _classCallCheck(instance, Constructor) { /* Babel class check stuff */ }

var MyClass = function () {
  function MyClass() {
    _classCallCheck(this, MyClass);
  }

  _createClass(MyClass, [{
    key: "getData",

    // async method
    value: Promise.method(function getData() {
      return Promise.resolve("data").delay(500);
    })

    // async generator

  }, {
    key: "getLotsOfData",
    value: Promise.coroutine(regeneratorRuntime.mark(function getLotsOfData() {
      var datas, i, datum;
      return regeneratorRuntime.wrap(function getLotsOfData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              datas = [];
              i = 0;

            case 2:
              if (!(i < 10)) {
                _context.next = 10;
                break;
              }

              _context.next = 5;
              return Promise.resolve(i).delay(500);

            case 5:
              datum = _context.sent;

              datas.push(datum);

            case 7:
              i++;
              _context.next = 2;
              break;

            case 10:
              return _context.abrupt("return", datas);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, getLotsOfData, this);
    }))
  }]);

  return MyClass;
}();
```

# Worth Mentioning

For browser use, ensure that the Bluebird library is loaded (for obvious reasons), and in a Node environment that it has been loaded globablly or within the current script.
