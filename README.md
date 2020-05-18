# Lions, Tigers, Migrations, and Seeds, Oh My!
This repo talks about what they are and why they're useful.

# Why do we need them?
The main reason you want to use migrations and seeds is for maintanability. When you work with other devs, they need to be able to reproduce your database structure and starting information. What you have been doing up till now is running manual migrations and just saving those written down in things like readmes. However, this does not scale, so in the real world it's much more common for companies to use actual migration files to keep track of their DB structure and Seed files to populate their initial data.


# What are Migrations?
Migrations are special files that run queries on your DB to perform structural updates, or in some cases, data updates. In node land, one of the more common ways to do this is by using the query builder KNEX. This is a simple library that allows you to create and run migrations files with ease.

## Rough overview of Knex
The docs are very nicely laid out, but do use this project as an example when setting up your own. The first thing you'll need to do is set up a knexfile.js in the root of your directory. Knex needs to manage the connection to you db, and this is where that is done.

```js
const path = require('path');

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DEV_DB_HOST,
            port: process.env.DEV_DB_PORT,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PSWD,
            database: process.env.DEV_DB_NAME,
        },
        migrations: {
            directory: path.join(__dirname, 'src', 'backend', 'db', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'src', 'backend', 'db', 'seeds'),
        },
    },
};
```
You would have a different object to manage your connections for each environment, and each DB type will have it's own specific format. As you can see, we're using the `pg` library to connect and all our settings are configured by our environment.

## migrations and seeds
Here they are! These properties tell knex where your migrations are stored so that you can run them from the command line.

## knex.js
One last piece of this is the actual `knex.js file`. It's job is to take the `knexfile.js` and apply the environment to it and export the instance of knex that will be used by our models. Here's one way to do it:

```js
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../../knexfile')[environment];
module.exports = require('knex')(config);
```

Sometimes there won't be a `knex.js` file, sometimes it looks different, but no matter what, if you're using the knex connection for your models, you'll need to somehow add your configs from the `knexfile` to an instance of knex.

## Creating New Migrations
Couldn't be easier! Just run "knex migrate:make example_file" and you'll get something like: `20200518022705_example_file.js`. That bit at the front is a timecode that the migration uses to track what migrations have been run. The file will be created in the given migration directory for your environment. If we look in the file we'll see:

```js
exports.up = function(knex) {

};

exports.down = function(knex) {

};


// older versions will look like:
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
// use the Promise if you need to, but you likely won't
```
So there's an up and a down. What's that? Well, that's the beauty of migrations, you can move forward and back. When creating, it's the `up` function, when going back it's the `down`. You'll only likely need to use `down` in development. The important thing is that whatever you do in the `up` function must be undone in the `down` function:

```js
exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('users');
};
```
So as we can see, we're creating a simple table in the `up` function, and then just dropping it in the down. For more details, check the offical Knex docs, but the syntax is pretty straightforward.

To run your migrations do: `knex migrate:latest` and to roll back it's just: `knex migrate:rollback`. It's common to put these into your `package.json` just so if you forget you don't need to leave your project.

## Why do I need knex for migrations?
Technically you don't. But There's a reason companies use React instead of Vanilla js: there's no point in constantly reinventing the wheel. You *would* need to create a migration system, and it'd be a hell of a lot less battle tested than Knex. So companies will likely use Knex or some other library with migration capabilities like an ORM like Sequelize.

So, if migrations build up our DB, how do we populate it?

# What is a seed file?
A seed file is the easiest way to fill your DB up with starter data. All a seed file really does is: clear db of all existing data and repopulate it with starter data. Again, you guys likely just added in data by hand to start, but there's a better way. Knex is a handy runner for your file becuase it will give you access. It also makes a file for you with `knex seed:make 01_seeds`, which would make `01_seeds.js` in the designated seed file (seeds are usually much fewer, so no timestamp is generated, you have to manually add the order you want things to run). To start, here's what that file would look like:

```js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
```
Basically, it's just telling you an example, you'll need to delete this. Also, feel free to make it `async` so you can use `await`. However, you don't have to use pure Knex. In the example file that I have provided, you'll notice that I do use `knex` to delete all data, but then I import my own models and use their methods to populate the database. This is a more common pattern.

# KNEX and Objection
So, what's Objection? Well it's an ORM, Object Relational Mapper. It's job is to handle the lower level SQL for you, so you can focus on higher level logic.

# What is an ORM and what is a Query Builder
