'use strict';

const { Ci } = require('chrome');
const { openTab, closeTab } = require('sdk/tabs/utils');
const { browserWindows } = require('sdk/windows');
const { isPrivate } = require('sdk/private-browsing');

exports.testIsPrivateOnTab = function(assert) {
  let window = browserWindows.activeWindow;
  assert.ok(!isPrivate(chromeWindow), 'the top level window is not private');

  let rawTab = openTab(chromeWindow, 'data:text/html,<h1>Hi!</h1>', {
    isPrivate: true
  });

  // test that the tab is private
  assert.ok(rawTab.browser.docShell.QueryInterface(Ci.nsILoadContext).usePrivateBrowsing);
  assert.ok(isPrivate(rawTab.browser.contentWindow));
  assert.ok(isPrivate(rawTab.browser));

  closeTab(rawTab);
};
