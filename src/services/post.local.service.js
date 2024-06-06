
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { httpService } from './http.service.js'
const POST_DB = 'post_db'
const zBASE_URL = 'post/'

export const postService = {
    query,
    getById,
    save,
    remove,

}

async function query(filterBy = {}) {

    try {
        let posts = await storageService.query(POST_DB)
        if (!posts || !posts.length) {
            posts = _createPosts()
            _savePosts(posts)
        }
        return posts
    } catch (err) {
        console.log(err)
    }
}

async function getById(postId) {
    try {
        const post = await storageService.get(POST_DB, postId)
        return post
    } catch (err) {
        console.log(err)
    }
}

async function remove(postId) {
    try {
        await storageService.remove(POST_DB, postId)
    } catch (err) {
        console.log(err)
    }
}

async function save(post) {
    try {
        if (post._id) {
            const updatedPost = await storageService.put(POST_DB, post)
            return updatedPost
        } else {
            post._id = utilService.makeId()
            console.log(post._id);
            const postToAdd = await storageService.post(POST_DB, post)
            return postToAdd
        }
    } catch (err) {
        console.log(err)
    }
}



function _savePosts(posts) {
    localStorage.setItem(POST_DB, JSON.stringify(posts))
}

function _createPosts() {
    return [{
        _id: "s101",
        txt: "Best trip ever",
        imgUrl: "http://some-img",
        by: {
            _id: "u101",
            fullname: "Ulash Ulashi",
            imgUrl: "https://randomuser.me/api/portraits/men/80.jpg"
        },
        loc: { // Optional
            lat: 11.11,
            lng: 22.22,
            name: "Tel Aviv"
        },
        comments: [
            {
                id: "c1001",
                by: {
                    _id: "u105",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                txt: "good one!",
                likedBy: [ // Optional
                    {
                        "_id": "u105",
                        "fullname": "Bob",
                        "imgUrl": "http://some-img"
                    }
                ]
            },
            {
                id: "c1002",
                by: {
                    _id: "u106",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                },
                txt: "not good!",
            }
        ],
        likedBy: [
            {
                _id: "u105",
                fullname: "Bob",
                imgUrl: "http://some-img"
            },
            {
                _id: "u106",
                fullname: "Dob",
                imgUrl: "http://some-img"
            }
        ],
        tags: ["fun", "romantic"]
    },
    {
        _id: "s102",
        txt: "Amazing adventure",
        imgUrl: "http://another-img",
        by: {
            _id: "u102",
            fullname: "Anna Anni",
            imgUrl: "http://another-img"
        },
        loc: { // Optional
            lat: 33.33,
            lng: 44.44,
            name: "New York"
        },
        comments: [
            {
                id: "c1003",
                by: {
                    _id: "u107",
                    fullname: "Charlie",
                    imgUrl: "http://another-img"
                },
                txt: "Fantastic!",
                likedBy: [ // Optional
                    {
                        _id: "u107",
                        fullname: "Charlie",
                        imgUrl: "http://another-img"
                    }
                ]
            },
            {
                id: "c1004",
                by: {
                    _id: "u108",
                    fullname: "Dani",
                    imgUrl: "http://another-img"
                },
                txt: "I want to go there too!"
            }
        ],
        likedBy: [
            {
                _id: "u107",
                fullname: "Charlie",
                imgUrl: "http://another-img"
            },
            {
                _id: "u108",
                fullname: "Dani",
                imgUrl: "http://another-img"
            }
        ],
        tags: ["adventure", "exploration"]
    }, {
        _id: "s103",
        txt: "Lovely beach day",
        imgUrl: "http://beach-img",
        by: {
            _id: "u103",
            fullname: "Becky Beach",
            imgUrl: "https://randomuser.me/api/portraits/men/80.jpg"
        },
        loc: { // Optional
            lat: 55.55,
            lng: 66.66,
            name: "Malibu"
        },
        comments: [
            {
                id: "c1005",
                by: {
                    _id: "u109",
                    fullname: "Eve",
                    imgUrl: "http://beach-img"
                },
                txt: "Looks so relaxing!",
                likedBy: [ // Optional
                    {
                        _id: "u109",
                        fullname: "Eve",
                        imgUrl: "http://beach-img"
                    }
                ]
            },
            {
                id: "c1006",
                by: {
                    _id: "u110",
                    fullname: "Frank",
                    imgUrl: "http://beach-img"
                },
                txt: "Wish I was there!"
            }
        ],
        likedBy: [
            {
                _id: "u109",
                fullname: "Eve",
                imgUrl: "http://beach-img"
            },
            {
                _id: "u110",
                fullname: "Frank",
                imgUrl: "http://beach-img"
            }
        ],
        tags: ["beach", "sunset"]
    },
    {
        _id: "s104",
        txt: "Mountain hike",
        imgUrl: "http://mountain-img",
        by: {
            _id: "u104",
            fullname: "Mike Mount",
            imgUrl: "https://randomuser.me/api/portraits/men/80.jpg"
        },
        loc: { // Optional
            lat: 77.77,
            lng: 88.88,
            name: "Rocky Mountains"
        },
        comments: [
            {
                id: "c1007",
                by: {
                    _id: "u111",
                    fullname: "Gina",
                    imgUrl: "http://mountain-img"
                },
                txt: "Breathtaking view!",
                likedBy: [ // Optional
                    {
                        _id: "u111",
                        fullname: "Gina",
                        imgUrl: "http://mountain-img"
                    }
                ]
            },
            {
                id: "c1008",
                by: {
                    _id: "u112",
                    fullname: "Hank",
                    imgUrl: "http://mountain-img"
                },
                txt: "Nature at its best!"
            }
        ],
        likedBy: [
            {
                _id: "u111",
                fullname: "Gina",
                imgUrl: "http://mountain-img"
            },
            {
                _id: "u112",
                fullname: "Hank",
                imgUrl: "http://mountain-img"
            }
        ],
        tags: ["hiking", "nature"]
    }
    ]
}