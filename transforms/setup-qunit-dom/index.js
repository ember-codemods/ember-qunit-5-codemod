const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);

  /**
   * Check if the AST has the given import declaration
   * @param {AST} root
   * @param {string} specifierName
   * @param {string} sourceName
   * @return {boolean}
   */
  function hasImport(root, specifierName, sourceName) {
    let hasSpecifier = false;
    let hasSource = false;

    root.find(j.ImportDeclaration).forEach((path) => {
      let specifiers = path.node.specifiers;
      let source = path.node.source;

      specifiers.forEach((specifier) => {
        if (specifierName === 'QUnit') {
          if (
            (specifier.type === 'ImportNamespaceSpecifier' ||
              specifier.type === 'ImportDefaultSpecifier') &&
            specifier.local.name === specifierName
          ) {
            hasSpecifier = true;
          }
        } else if (specifierName === 'setup') {
          if (specifier.type === 'ImportSpecifier' && specifier.imported.name === specifierName) {
            hasSpecifier = true;
          }
        }

        if (source.value === sourceName) {
          hasSource = true;
        }
      });
    });

    return hasSpecifier && hasSource;
  }

  /**
   * Check if test-helper.js has setup(QUnit.assert);
   * @param {AST} root
   * @return {boolean}
   */
  function hasQunitSetup(root) {
    return root.find(j.CallExpression).some((path) => {
      let callee = path.node.callee;
      let callExpressionArguments = path.node.arguments;

      if (callee.name !== 'setup') {
        return false;
      }

      let hasCorrectArguments = callExpressionArguments.some((argument) => {
        return (
          argument.type === 'MemberExpression' &&
          argument.object.name === 'QUnit' &&
          argument.property.name === 'assert'
        );
      });

      return hasCorrectArguments;
    });
  }

  /**
   * Insert given import declatation to the beginning of file
   * @param {string} specifier
   * @param {string} source
   * @param {boolean} defaultImportDeclaration
   */
  function addImportDeclaration(specifier, source, defaultImportDeclaration) {
    const program = root.find(j.Program).at(0).nodes()[0];

    const importSpecifier = defaultImportDeclaration
      ? [j.importSpecifier(j.identifier(specifier))]
      : [j.importNamespaceSpecifier(j.identifier(specifier))];

    const setupImportDeclaration = j.importDeclaration(
      importSpecifier,
      j.stringLiteral(source),
      'value'
    );

    program.body.unshift(setupImportDeclaration);
  }

  /**
   * Insert 'setup(QUnit.assert);' above 'setApplication(Application.create(config.APP));'
   * @param {AST} root
   */
  function insertSetupQunit(root) {
    const setupFunction = j.expressionStatement(
      j.callExpression(j.identifier('setup'), [
        j.memberExpression(j.identifier('QUnit'), j.identifier('assert')),
      ])
    );

    root.find(j.ExpressionStatement).forEach((path) => {
      if (path.node.expression.callee && path.node.expression.callee.name === 'setApplication') {
        path.insertBefore(setupFunction);
      }
    });
  }

  function transform() {
    if (!hasImport(root, 'setup', 'qunit-dom')) {
      addImportDeclaration('setup', 'qunit-dom', true);
    }

    if (!hasImport(root, 'QUnit', 'qunit')) {
      addImportDeclaration('QUnit', 'qunit', false);
    }

    if (!hasQunitSetup(root)) {
      insertSetupQunit(root);
    }
  }

  transform();

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

module.exports.type = 'js';
