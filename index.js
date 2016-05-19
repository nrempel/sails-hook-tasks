'use strict';

/**
 * @description sails-hook-tasks is a task scheduler for sails.
 *              It discovers tasks at api/tasks and runs them at defined intervals.
 *              This hook leverages the fantastic https://github.com/node-schedule/node-schedule
 * @param  {Object} sails a sails application
 * @return {Object} sails-hook-tasks that implements the sails installable hook spec
 */
module.exports = function(sails) {
  var schedule = require('node-schedule');
  var _ = require('lodash');

  /**
   * Discovers tasks at api/tasks and schedules them recursively
   *
   * @param {object} config Configuration object for this hook
   */
  function initializeTasks() {
    // Find all tasks in `api/tasks`
    var tasks = require('require-all')({
      dirname: sails.config.appPath + '/api/tasks',
      filter: /(.+Task)\.js$/,
      excludeDirs: /^\.(git|svn)$/,
      recursive: true
    });

    // For each task discovered, register with node-schedule
    _.each(tasks, function(task, key) {
      // TODO: support recursive task discovery
      schedule.scheduleJob(task.schedule, task.task);
    });
  }

  return {
    defaults: {
      __configKey__: {
        // Activate or deactivate the hook
        active: true,
      }
    },

    initialize: function(done) {
      var config = sails.config[this.configKey];

      // Short-circuit if deactivated
      if (!config.active) {
        sails.log.info('sails-hooks-tasks deactivated.');
        return done();
      }

      // Register our tasks
      initializeTasks();

      // Notify when loaded correctly
      sails.on('lifted', function() {
        sails.log('sails-hook-tasks loaded successfully');
      });

      done();
    },

    reload: function(done) {
      sails.log.info('Reloading sails-hook-tasks.');
      done = done || function(){};
      
      var config = sails.config[this.configKey];
      initializeTasks(config);
      
      done();
    }
  };
};
