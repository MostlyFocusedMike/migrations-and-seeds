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

# What is a seed file?


# KNEX and Objection

# What is an ORM and what is a Query Builder
