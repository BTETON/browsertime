/**
 * Browsertime (http://www.browsertime.com)
 * Copyright (c) 2014, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var webdriver = require('selenium-webdriver'),
  proxy = require('selenium-webdriver/proxy');

var externalProxy;

module.exports.setProxy = function(p) {
  externalProxy = p;
};

module.exports.getDriver = function(arg) {

  var cap = webdriver.Capabilities.safari();

  var proxyUrl = externalProxy.getProxyUrl();
  if (proxyUrl) {
    cap.setProxy(proxy.manual({ http: proxyUrl }));
  }

  return new webdriver.Builder().withCapabilities(cap).build();
};