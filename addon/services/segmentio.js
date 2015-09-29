import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    if (!window.analytics) {
      // Stub out track method to prevent
      // errors calling `segmentio.track(...)`.
      this.track = function(){};
      return;
    }

    // copy all functions from analytics
    Object.getOwnPropertyNames(window.analytics)
      .forEach((methodName) => {
        let origFn = window.analytics[methodName];
        if (typeof origFn !== 'function') { return; }
        // ensure same as calling window.analytics[methodName]() with bind
        this[methodName] = origFn.bind(window.analytics);
      });
  }
});
