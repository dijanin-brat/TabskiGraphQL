const db = require('../models');
const model = db.sequelize.models.post;
const user = db.sequelize.models.user;
const likedPost = db.sequelize.models.liked_post;

async function getPosts(limit, offset) {
    return model.findAll({
        include: [
            {
                model: user,
                as: 'user'
            },
            {
                model: user,
                as: 'liked_post_user',
                required: false
            }
        ],
        limit: limit,
        offset: offset
    });
}

async function getPostById(id) {
    return model.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: user,
                as: 'user'
            },
            {
                model: user,
                as: 'liked_post_user',
                required: false
            }
        ]
    });
}

async function createPost(title, content, authorId) {
    return model.create({
        title,
        content,
        authorId
    });
}

async function deletePost(id) {
    await likedPost.destroy({
        where: {
            postId: id
        }
    });

    return model.destroy({
        where: {
            id: id
        }
    });
}

async function updatePost(id, title, content, authorId) {
    const updateObject = {};
    if (title) {
        updateObject.title = title;
    }

    if (content) {
        updateObject.content = content;
    } 

    if (authorId) {
        updateObject.authorId = authorId;
    }

    return model.update(updateObject,
    {
        where: {
            id: id
        },
        returning: true,
        plain: true
    });
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost
}