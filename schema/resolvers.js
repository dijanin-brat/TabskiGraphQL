const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');

const resolvers = {
    Query: {
        async users(_, {limit, offset}) {
            try {
                return UserController.getUsers(limit,offset);
            } catch (e) {
                console.log(e);
            }
        },
        async user(_, {id}) {
            try {
                return UserController.getUserById(id);
            } catch (e) {
                console.log(e);
            }
        },
        async posts(_, {limit, offset}) {
            try {
                return PostController.getPosts(limit, offset);
            } catch (e) {
                console.log(e)
            }
        },
        async post(_, {id}) {
            try {
                return PostController.getPostById(id);
            } catch (e) {
                console.log(e);
            }
        }
    },

    Mutation: {
        async createUser(_, {name, email, password}) {
            try {
                return UserController.createUser(name, email, password);
            } catch (e) {
                console.log(e);
            }
        },
        async deleteUser(_, {id}) {
            try {
                return UserController.deleteUser(id);
            } catch (e) {
                console.log(e)
            }
        },
        async updateUser(_, {id, name, email, password}) {
            try {
                return UserController.updateUser(id, name, email, password);
            } catch (e) {
                console.log(e);
            }
        },
        async likePost(_, {userId, postId}) {
            try {
                return UserController.likePost(userId, postId);
            } catch (e) {
                console.log(e);
            }
            
        },
        async unlikePost(_,{id}) {
            try {
                return UserController.unlikePost(id);
            } catch (e) {
                console.log(e);
            }
        },
        async createPost(_, {title, content, authorId}) {
            try {
                return PostController.createPost(title, content, authorId);
            } catch (e) {
                console.log(e)
            }
        },
        async deletePost(_, {id}) {
            try {
                return PostController.deletePost(id);
            } catch (e) {
                console.log(e)
            }
        },
        async updatePost(_, {id, title, content, authorId}) {
            try {
                return PostController.updatePost(id, title, content, authorId);
            } catch (e) {
                console.log(e)
            }
        }
    }
}

module.exports = { resolvers };