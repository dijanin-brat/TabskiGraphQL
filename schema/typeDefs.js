const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
        posts: [PostUser!]
        liked_user_post: [PostUser!]
    }

    type PostUser {
        id: Int!
        title: String!
        content: String!
        authorId: Int!
    }

    type UserPost {
        id: Int!
        name: String!
        email: String!
        password: String!
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        authorId: Int!
        user: UserPost!
        liked_post_user: [UserPost!]
    }

    type LikedPost {
        id: Int!
        userId: Int!
        postId: Int!
    }

    type Query {
        users: [User!]!
        user(id: Int!): User!
        posts: [Post!]!
        post(id: Int!): Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): UserPost!
        deleteUser(id: Int!): String!
        updateUser(id: Int!, name: String, email: String, password: String): UserPost!
        likePost(userId: Int!, postId: Int!): LikedPost!
        unlikePost(id: Int!): String!
        createPost(title: String!, content: String!, authorId: Int!): PostUser!
        deletePost(id: Int!): String!
        updatePost(id: Int!, title: String, content: String, authorId: Int): PostUser!
    }

`

module.exports = {typeDefs};