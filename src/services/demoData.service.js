import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_DB = "user_db"
const POST_DB = 'post_db'

export const demoDataService = {
    query,
    createUser
};

function _saveUsers(users) {
    localStorage.setItem(USER_DB, JSON.stringify(users))
}

function _savePosts(posts) {
    localStorage.setItem(POST_DB, JSON.stringify(posts))
}

function createUser() {
    const { fullName, gender } = utilService.getRandomFullName();
    return {
        _id: utilService.makeId(),
        username: utilService.getRandomUsername(fullName),
        fullname: fullName,
        profileImg: utilService.getRandomProfileImg(gender),
        gender: gender
    };
}

async function query(filterBy = {}) {
    try {
        // Query users
        let users = await storageService.query(USER_DB);

        // If no users found, create demo users
        if (!users || !users.length) {
            users = _createUsersDemoData();
        }

        // Create posts if not already created
        let posts = await _createPostsDemoData(users);

        return posts;
    } catch (err) {
        console.log(err);
    }
}

async function _createPostsDemoData(users, numPosts = 100) {
    try {
        let posts = await storageService.query(POST_DB);
        if (!posts || !posts.length) {
            posts = [];
            for (let i = 0; i < numPosts; i++) {
                posts.push(createPost(users));
            }
            _savePosts(posts);
        }
        return posts;
    } catch (err) {
        console.log(err);
    }
}

function createPost(users) {
    const user = users[utilService.getRandomInt(0, users.length - 1)];
    const numComments = utilService.getRandomInt(0, 10);
    const comments = [];
    for (let i = 0; i < numComments; i++) {
        const commentUser = users[utilService.getRandomInt(0, users.length - 1)];
        comments.push({
            id: utilService.makeId(),
            by: { id: commentUser._id, fullname: commentUser.fullname, username: commentUser.username },
            txt: utilService.getRandomText(),
            likedBy: []
        });
    }

    const numLikes = utilService.getRandomInt(0, users.length);
    const likedBy = [];
    for (let i = 0; i < numLikes; i++) {
        const likedUser = users[utilService.getRandomInt(0, users.length - 1)];
        if (!likedBy.includes(likedUser._id)) {
            likedBy.push(likedUser._id);
        }
    }

    return {
        _id: utilService.makeId(),
        txt: utilService.getRandomText(),
        imgUrl: utilService.getRandomProfileImg(),
        by: {id : user._id, username: user.username, fullname : user.fullname, profileImg : user.profileImg},
        // loc: utilService.getRandomLocation(), // Optional, you can remove this line if you don't want locations
        comments: comments,
        likedBy: likedBy,
        tags: ["fun", "romantic"]
    };
}

async function _createUsersDemoData(numUsers = 30) {
    try {
        let users = await storageService.query(USER_DB);
        if (!users || !users.length) {
            users = [];
            for (let i = 0; i < numUsers; i++) {
                users.push(createUser());
            }
            _saveUsers(users);
        }
        return users;
    } catch (err) {
        console.log(err);
    }
}



