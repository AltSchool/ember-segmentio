import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    if (!window.analytics) {
      // Stub out track method to prevent
      // errors calling `segmentio.track(...)`.
      // during development or test
      this.track = function(){};
      this.identify = function(){};
      this.page = function(){};
      return;
    }

    // copy all functions from analytics
    Object.getOwnPropertyNames(window.analytics)
      .forEach((methodName) => {
        if (typeof window.analytics[methodName] !== 'function') { 
          return;
        }
        // ensure same as calling window.analytics[methodName]() by proxying
        this[methodName] = function(...args) {
          window.analytics[methodName].apply(window.analytics, args);
        };
      });
  }
});
