/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

function readSnippet() {
  try {
    // NOTE: expecting addon as a node_module on parent addon or in an Ember CLI application.
    return fs.readFileSync(path.join(process.cwd(), 'node_modules/ember-segmentio/vendor/snippet-core.min.js'), {
      encoding: 'UTF-8'
    });
  } catch(error) {
    if (error.code === 'ENOENT') {
      return '';
    } else {
      throw error;
    }
  }
}

module.exports = {
  name: 'ember-segmentio',

  contentFor: function(type, config) {
    var content = '';
    var coreSnippet = readSnippet();
    var hasSnippet = !!coreSnippet;

    if (!config.SEGMENTIO_TOKEN) {
      console.warn('ember-segmentio: Not enabled missing key "SEGMENTIO_TOKEN" in parent application/addon.');
    }

    if (!hasSnippet) {
      console.warn('ember-segmentio: Error while reading snippet.');
    }

    if (hasSnippet && type === 'head') {
      content = [
        '<script type="text/javascript">',
        '(function(){',
        coreSnippet
      ];

      if (!!config.SEGMENTIO_TOKEN) { //only load when valid token
        config.push('analytics.load("', config.SEGMENTIO_TOKEN, '");');
        config.push('analytics.page();');
      }

      config.push(
        '})();',
        '</script>'
      );
      content = content.join('');
    }
    return content;
  }

};
