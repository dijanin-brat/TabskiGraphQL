const UserService = require('../services/user.service');
const PostService = require('../services/post.service');

async function getUsers(limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    const users = await UserService.getUsers(limit, offset);
    console.log(users);
    return users;
}

async function getUserById(id) {
    const user = await UserService.getUserById(id);

    return user
}

async function createUser(name, email, password) {
    
    const user = await UserService.createUser(name, email, password);
    
    return user
}

async function deleteUser(id) {
    
    const user = await UserService.deleteUser(id);
    
    return 'User deleted successfuly'
}

async function updateUser(id, name, email, password) {
        const user = await UserService.updateUser(id, name, email, password);

        return user[1].dataValues;
}

async function likePost(userId, postId) {
    const user = await UserService.getUserById(userId);

    if (!user) {
        throw Error('There is no user with this ID');
    }

    const post = await PostService.getPostById(postId);

    if (!post) {
        throw Error('There is no post with this ID');
    }

    const likedPost = await UserService.likePost(userId, postId);

    return likedPost;
}

async function unlikePost(id) {
    
        const likedPost = await UserService.unlikePost(id);

        return 'Post successfuly unliked';
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