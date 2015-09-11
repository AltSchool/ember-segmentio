import { moduleFor, test } from 'ember-qunit';

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
    track: function() {},
    alias: function() {},
    identify: function() {}
  };

  var service = this.subject();

  assert.equal(service.get('track'), window.analytics.track);
  assert.equal(service.get('alias'), window.analytics.alias);
  assert.equal(service.get('identify'), window.analytics.identify);
});

