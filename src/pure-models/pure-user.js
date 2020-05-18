const { pool, query } = require('./pg-connection');

const User = {
    all: async () => {
        const queryText = 'SELECT * FROM users';
        const data = await query(queryText);
        return data.rows;
    },

    find: async (id) => {
        const queryText = 'SELECT * FROM users where id = $1';
        const data = await query(queryText, [id]);
        return data.rows[0];
    },

    findByName: async (value) => {
        const queryText = `SELECT * FROM users where name = $1`;
        const data = await query(queryText, [value]);
        return data.rows;
    },

    createWithRelations: async (values) => { // holy cow what a pain and this is just ONE class
        const queryTextUser = `
            INSERT INTO users (name)
            VALUES ($1)
            RETURNING *;
        `;
        const queryTextArticle = `
            INSERT INTO articles (title, user_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const queryTextTag = `
            INSERT INTO tags (name, slug)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const queryTextArticleTags = `
            INSERT INTO article_tags (article_id, tag_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const data1 = await query(queryTextUser, [values.name]);
        newUser = data1.rows[0];
        newUser.articles = [];
        // await in for loop is extremely slow
        for (let i = 0; i < values.articles.length; i++) {
            const rawArticle = values.articles[i]
            const data2 = await query(queryTextArticle, [rawArticle.title, newUser.id]);
            const dbArticle = data2.rows[0];
            dbArticle.tags = [];
            newUser.articles.push(dbArticle)
            console.log('dbArticle: ', dbArticle);
            for (let j = 0; j < rawArticle.tags.length; j++) {
                rawTag = rawArticle.tags[j];
                const data3 = await query(queryTextTag, [rawTag.name, rawTag.slug]);
                const dbTag = data3.rows[0];
                await query(queryTextArticleTags, [dbArticle.id, dbTag.id])
                dbArticle.tags.push(dbTag);
            }
        }
        return newUser;
    },

    relations: async () => {
        console.log('not even gonna bother');
    },
    testQuery: async () => {
        return User.createWithRelations({
            name: 'Sara',
            articles: [
                {
                    title: '3rd article',
                    tags: [
                        {
                            name: 'Newbie',
                            slug: 'noob',
                        },
                    ],
                },
                {
                    title: '4thhhhhhh article',
                    tags: [
                        {
                            name: 'Wow',
                            slug: 'wow',
                        },
                        {
                            name: 'Free',
                            slug: 'fee',
                        },
                    ],
                },
            ],
        })
    }
}

module.exports = User;
