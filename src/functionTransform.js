const REPLACED = Symbol();

export default function(t, stack) {
  let bluebird = t.identifier("Promise");

  return {

    enter(path) {
      let { node } = path;

      if (node.async === true) {
        stack.push(node);
      }
    },

    exit(path) {
      let { node } = path;

      if (node && !node[REPLACED] && node.async === true) {
        let fn = stack.pop();
        // generators use 'coroutine' helper, other wise just 'method'
        let methodName = fn.generator ? "coroutine": "method";
        let asyncWrap = t.memberExpression(bluebird, t.identifier(methodName));

        fn[REPLACED] = true;
        fn.async = false; // prevent recursive visits
        path.replaceWith(t.callExpression(asyncWrap, [fn]));
      }
    }

  };
}
