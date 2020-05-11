/* eslint-disable no-await-in-loop */
const User = require('../../models/user');

exports.seed = async (knex) => {
    await knex('tags').del();
    await knex('users').del();

    // multiple create (all objects, even children must be new)
    await User.create([
        {
            name: 'tom',
            articles: [
                {
                    title: 'I am the first article',
                    tags: [
                        {
                            name: 'Beginners',
                            slug: 'beginners',
                        },
                    ],
                },
                {
                    title: 'It is I, the second article',
                    tags: [
                        {
                            name: 'Advanced JavaScript',
                            slug: 'advanced-javascript',
                        },
                        {
                            name: 'Fun',
                            slug: 'fun',
                        },
                    ],
                },
            ],
        },
    ]);

    // see what was made
    const users = await User.all();
    for (let i = 0; i < users.length; i++) {
        console.log('user: ', users[i]);
        const articles = await users[i].relations('articles');
        for (let j = 0; j < articles.length; j++) {
            console.log(articles[j]);
            const tags = await articles[j].relations('tags');
            console.log(tags, '\n');
        }
    }
};
