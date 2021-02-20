# setup-qunit-dom


## Usage

```
npx ember-qunit-5-codemod setup-qunit-dom path/of/files/ or/some**/*glob.js

# or

yarn global add ember-qunit-5-codemod
ember-qunit-5-codemod setup-qunit-dom path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js setup-qunit-dom path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [test-default-import-specifier](#test-default-import-specifier)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/setup-qunit-dom/__testfixtures__/basic.input.js)</small>):
```js
import Application from 'insights-hub-web-fe/app'; 
import config from 'insights-hub-web-fe/config/environment'; 
import { setApplication } from '@ember/test-helpers'; 
import { start } from 'ember-qunit'; 
 
setApplication(Application.create(config.APP)); 
 
start(); 
```

**Output** (<small>[basic.output.js](transforms/setup-qunit-dom/__testfixtures__/basic.output.js)</small>):
```js
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from 'insights-hub-web-fe/app';
import config from 'insights-hub-web-fe/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start(); 
```
---
<a id="test-default-import-specifier">**test-default-import-specifier**</a>

**Input** (<small>[test-default-import-specifier.input.js](transforms/setup-qunit-dom/__testfixtures__/test-default-import-specifier.input.js)</small>):
```js
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start(); 

```

**Output** (<small>[test-default-import-specifier.output.js](transforms/setup-qunit-dom/__testfixtures__/test-default-import-specifier.output.js)</small>):
```js
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start(); 
```
<!--FIXTURES_CONTENT_END-->