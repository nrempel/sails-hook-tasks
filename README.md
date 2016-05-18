# sails-hook-tasks
SailsJS hook to run scheduled tasks

This hook leverages [node-schedule](https://github.com/node-schedule/node-schedule) to give you a clean and scalable way to register any number of scheduled tasks in your application.

## Installation
```js
$ npm install --save sails-hook-tasks
```

## Usage

The hook will load any tasks found in `api/tasks` with a filename like `*Task.js`. e.g., `api/tasks/MaintenanceTask.js`.

The task definition must include two functions:

- `schedule` attribute that defines the interval which this task will run at. For supported formats, refer to [node-schedule](https://github.com/node-schedule/node-schedule#cron-style-scheduling.).
- `task()` the function that will be run at the defined interval.

Example:

```js
// api/tasks/MaintenanceTask.js
module.exports = {
  schedule: '*/10 * * * *',
  task: function () {
    // Do some maintenance here!
  }
};
```

## Configuration

You can optionally configure the hook by creating a configuration file at `config/tasks.js`.

Currently, only one configuration paramater is supported.

You can copy this into `config/tasks.js` if you want:

```js
module.exports.tasks = {
    // default: true
    active: true,
}
```

## Tests
TODO

## Contribute
Please do! Create an issue with any questions or submit a pull request.

## License
[MIT](https://github.com/servmetrics/sails-hook-tasks/blob/master/LICENSE)
