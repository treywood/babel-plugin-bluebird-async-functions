export default function({ types: t }) {

  const REPLACED = Symbol();
  const bluebird = t.identifier("Promise");

  return {
    visitor: {
      FunctionExpression(path) {
        let { node } = path;

        // work with async methods
        if (!node[REPLACED] && node.async === true) {

          // generators use 'coroutine' helper, other wise just 'method'
          let methodName = node.generator ? "coroutine": "method";
          let asyncWrap = t.memberExpression(bluebird, t.identifier(methodName));

          node[REPLACED] = true;
          node.async = false; // prevent recursive visits
          path.replaceWith(t.callExpression(asyncWrap, [node]));
        }
      }
    }
  };
}
