# ember-qunit-5-codemod


A collection of codemods for ember-qunit-5-codemod. 
Migrates applications using ember-qunit &lt; 5.0.0 to the new structure.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-qunit-5-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-qunit-5-codemod
ember-qunit-5-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [setup-qunit-dom](transforms/setup-qunit-dom/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`