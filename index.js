/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

function readSnippet() {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'vendor/snippet-core.min.js'), {
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
    var enabled = config.SEGMENTIO_KEY && coreSnippet;

    // Warn when no snippet found in development regardless of whether new relic
    // is enabled.

    if (!config.SEGMENTIO_KEY) {
      console.warn('ember-segmentio: Not enabled missing key "SEGMENTIO_KEY" in parent application/addon.');
    }

    if (!coreSnippet) {
      console.warn('ember-segmentio: Error while reading snippet.');
    }

    if (enabled && type === 'head') {
      content = [
        "!function(){",
        coreSnippet,
        "analytics.load(", config.SEGMENTIO_KEY, ");",
        "analytics.page()",
        "}()"
      ].join("");
    }
    return content;
  }

};
