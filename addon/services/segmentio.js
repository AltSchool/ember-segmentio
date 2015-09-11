import Ember from 'ember';

// Should match methods in snippet-core.min.js
const SEGMENT_METHODS = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'page',
  'once',
  'off',
  'on'
];

export default Ember.Service.extend({
  init() {
    if (!window.analytics) { return; }
    SEGMENT_METHODS.forEach((methodName) => {
      let origFn = window.analytics[methodName];
      if (typeof origFn !== 'function') { return; }

      // ensure same as calling window.analytics[methodName]() with bind
      this[methodName] = origFn.bind(window.analytics);
    });
  }
});
