import Application from 'insights-hub-web-fe/app'; 
import config from 'insights-hub-web-fe/config/environment'; 
import { setApplication } from '@ember/test-helpers'; 
import { start } from 'ember-qunit'; 
 
setApplication(Application.create(config.APP)); 
 
start(); 