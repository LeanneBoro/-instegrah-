import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_DB = "user_db"
const POST_DB = 'post_db'

export const demoDataService = {
    createUser,
    createPostsDemoData,
    createUsersDemoData
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


async function createPostsDemoData(users, numPosts = 100) {
    try {
        let posts = await storageService.query(POST_DB);
        if (!posts || !posts.length) {
            posts = [];
            for (let i = 0; i < numPosts; i++) {
                posts.push(createPost(users));
            }
            posts.sort((b,a) => new Date(a.timeStamp) - new Date(b.timeStamp))
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
    const postTimestamp = utilService.getRandomDate();
    const comments = [];

    // Generate comments
    for (let i = 0; i < numComments; i++) {
        const commentUser = users[utilService.getRandomInt(0, users.length - 1)];
        
        // Generate random timestamp for each comment
        const commentTimestamp = utilService.getRandomDate(postTimestamp);

        // Generate a random number of likes for each comment
        const numLikes = utilService.getRandomInt(0, 10);
        const likedBy = [];
        const usedIndexes = new Set();
        
        while (likedBy.length < numLikes) {
            const randomIndex = utilService.getRandomInt(0, users.length - 1);
            if (!usedIndexes.has(randomIndex)) {
                likedBy.push(users[randomIndex]._id);
                usedIndexes.add(randomIndex);
            }
        }

        comments.push({
            id: utilService.makeId(),
            by: {
                id: commentUser._id,
                fullname: commentUser.fullname,
                username: commentUser.username,
                imgUrl: commentUser.profileImg
            },
            txt: utilService.getRandomText(),
            timeStamp: commentTimestamp,
            likedBy: likedBy
        });
    }

    // Generate a random number of likes for the post
    const numLikes = utilService.getRandomInt(0, users.length);
    const likedBy = [];
    const usedIndexes = new Set();
    
    while (likedBy.length < numLikes) {
        const randomIndex = utilService.getRandomInt(0, users.length - 1);
        if (!usedIndexes.has(randomIndex)) {
            likedBy.push(users[randomIndex]._id);
            usedIndexes.add(randomIndex);
        }
    }

    return {
        _id: utilService.makeId(),
        postImg: `https://picsum.photos/id/${utilService.getRandomInt(1, 120)}/1500/1500`,
        txt: utilService.getRandomText(),
        imgUrl: utilService.getRandomProfileImg(),
        timeStamp: postTimestamp,
        by: {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            profileImg: user.profileImg
        },
        // loc: utilService.getRandomLocation(), // Optional, you can remove this line if you don't want locations
        comments: comments,
        likedBy: likedBy,
        tags: ["fun", "romantic"]
    };
}


async function createUsersDemoData(numUsers = 30) {
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



