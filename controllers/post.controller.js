const PostService = require('../services/post.service');
const UserService = require('../services/user.service');

async function getPosts(limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    const posts = await PostService.getPosts(limit, offset);

    return posts
}

async function getPostById(id) {
        const post = await PostService.getPostById(id);
    
        return post
}

async function createPost(title, content, authorId) {    
    const user = await UserService.getUserById(authorId)

    if (!user) {
        throw Error('There is no user with this ID');
    }

    const post = await PostService.createPost(title, content, authorId);

    return post;
}

async function deletePost(id) {

    const post = await PostService.deletePost(id);
    
    return 'Post deleted successfuly';
}

async function updatePost(id, title, content, authorId) {

        if (authorId) {
            const user = await UserService.getUserById(authorId);

            if (!user) {
                throw Error('There is no user with this ID');
            }
        }
        const post = await PostService.updatePost(id, title, content, authorId);
    
        return post[1].dataValues;
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost
}