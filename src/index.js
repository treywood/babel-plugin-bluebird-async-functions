export default function({ types: t }) {

  const REPLACED = Symbol();
  const bluebird = t.identifier("Promise");
  var funcNode = null;

  return {
    visitor: {

      FunctionExpression: {

        enter(path) {
          let { node } = path;
          if (!node[REPLACED] && node.async === true) {
            funcNode = node;
          }
        },

        exit(path) {
          if (funcNode && !funcNode[REPLACED] && funcNode.async === true) {
            // generators use 'coroutine' helper, other wise just 'method'
            let methodName = funcNode.generator ? "coroutine": "method";
            let asyncWrap = t.memberExpression(bluebird, t.identifier(methodName));

            funcNode[REPLACED] = true;
            funcNode.async = false; // prevent recursive visits
            path.replaceWith(t.callExpression(asyncWrap, [funcNode]));

            funcNode = null;
          }
        }
      },

      AwaitExpression(path) {
        let { node } = path;
        let arg = node.argument;
        path.replaceWith(t.yieldExpression(arg));

        // if there's an 'await', we'll turn the function into a generator
        if (funcNode) {
          // assert that 'await' is used in async methods only
          t.assertFunctionExpression(funcNode, { async: true });
          
          funcNode.generator = true;
        }
      }
    }
  };
}
