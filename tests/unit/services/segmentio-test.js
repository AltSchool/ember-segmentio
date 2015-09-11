import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('service:segmentio', 'Unit | Service | segmentio', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});


test('it maps over functions from window.analytics', function(assert) {
  window.analytics = {
    track: sinon.stub(),
    alias: sinon.stub(),
    identify: sinon.stub()
  };
  var service = this.subject();
  ['track', 'alias', 'identify'].forEach((methodName) => {
    service[methodName]();
    assert.ok(window.analytics[methodName].called);
  });
});

