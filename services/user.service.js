const db = require('../models');
const model = db.sequelize.models.user;
const post = db.sequelize.models.post;
const likedPost = db.sequelize.models.liked_post;

async function getUsers(limit, offset) {
    return model.findAll({
        include: [
            {
                model: post,
                as: 'posts',
                required: false
            },
            {
                model: post,
                as: 'liked_user_post',
                required: false
            }
        ],
        limit: limit,
        offset: offset
    });
}

async function getUserById(id) {
    return model.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: post,
                as: 'posts',
                required: false
            },
            {
                model: post,
                as: 'liked_user_post',
                required: false
            }
        ]
    });
}

async function createUser(name, email, password) {
    return model.create({
        name,
        email,
        password
    });
}

async function deleteUser(id) {
    await likedPost.destroy({
        where: {
            userId: id
        }
    });

    const user = await model.findOne({
        where: {
            id: id
        }
    });
    return user.destroy();
}

async function updateUser(id, name, email, password) {
    const updateObject = {};
    if (name) {
        updateObject.name = name;
    }

    if (password) {
        updateObject.password = password;
    } 

    if (email) {
        updateObject.email = email;
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

async function likePost(userId, postId) {
    return likedPost.create({
        userId: userId,
        postId: postId
    });
}

async function unlikePost(likedPostId) {
    return likedPost.destroy({
        where: {
            id: likedPostId
        }
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    likePost,
    unlikePost
}