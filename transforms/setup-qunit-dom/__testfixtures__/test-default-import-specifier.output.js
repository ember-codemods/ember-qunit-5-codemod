import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start(); 