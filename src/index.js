import transform from './functionTransform';

var stack = [];

export default function({ types: t }) {

  return {
    visitor: {

      FunctionExpression: transform(t, stack),
      ArrowFunctionExpression: transform(t, stack),

      AwaitExpression(path) {
        let { node } = path;
        let arg = node.argument;
        path.replaceWith(t.yieldExpression(arg));

        // if there's an 'await', we'll turn the function into a generator
        let fn = stack[stack.length - 1];
        if (fn) {
          // assert that 'await' is used in async methods only
          t.assertFunctionExpression(fn, { async: true });
          fn.generator = true;
        }
      }
    }
  };
}
