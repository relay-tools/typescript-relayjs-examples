const babel = require("@babel/core");

module.exports = function jsResourceLoader(content, map, meta) {
  function babelPlugin({ types: t }) {
    const jsResourceAbsoluteModulePath = "./JSResource";
    const jsrIdent = t.identifier("JSResource");
    let program = null;
    let imported = false;
    function addImport() {
      if (!imported) {
        imported = true;
        const importDefaultSpecifier = t.importDefaultSpecifier(jsrIdent);
        const importDeclaration = t.importDeclaration(
          [importDefaultSpecifier],
          t.stringLiteral(jsResourceAbsoluteModulePath)
        );
        program.unshiftContainer("body", importDeclaration);
      }
    }

    function requireResolveWeak(modulePath) {
      return t.callExpression(
        t.memberExpression(
          t.identifier("require"),
          t.identifier("resolveWeak")
        ),
        [modulePath]
      );
    }

    const processed = [];

    return {
      name: "ast-transform", // not required
      visitor: {
        Program(path) {
          program = path;
        },
        Import(path) {
          const fn = path.getFunctionParent();
          if (processed.includes(path.node)) return;
          processed.push(path.node);
          if (fn && t.isCallExpression(path.parent)) {
            const callExpression = path.parent;
            const modulePath = callExpression.arguments[0];
            t.assertStringLiteral(modulePath);
            fn.replaceWith(
              t.callExpression(t.identifier("JSResource"), [
                requireResolveWeak(modulePath),
                fn.node,
              ])
            );
            addImport();
          }
        },
      },
    };
  }
  return babel.transformSync(content, {
    plugins: [babelPlugin],
  }).code;
};
