# node-starter
A boilerplate to get node project started

* Uses [Koa](https://koa.com/) with middleware
* [In-memory MongoDB](https://www.npmjs.com/package/mongodb-memory-server) is bundled for the development.
* Ready to use User model constructed with [Mongoose](https://mongoosejs.com/docs/)
* JWT token based auth in conjunction with [passport.js](http://www.passportjs.org/) is enabled

## Docker ready

You can spin-up the app with a single `docker-compose up` which will install and run the server with in-memory MongoDB.

## Heroku ready

The app is [Heroku](https://www.heroku.com/) ready with their default stack.

Recommended resources are:

* [mLab MongoDB](https://elements.heroku.com/addons/mongolab) (Heroku will set MONGODB_URI)

## Development

The app will automatically reload every time it detects a change in code (or configure `nodemon.json`).

Babel is configured to transpile files from `/src` directory to `/dist` directory.

[Prettier](https://prettier.io/) and ESLint is already in place so you don't have to worry about code-formatting at all.
