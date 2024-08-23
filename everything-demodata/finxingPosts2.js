export function addCommentTimestamps(post) {
    if (!post || !post.createdAt) {
      console.error('Invalid post object or missing createdAt:', post)
      return null // Or handle the error as needed
    }
  
    const postCreatedAt = parseInt(post.createdAt.$numberLong)
    const now = Date.now()
  
    post.comments.forEach(comment => {
      const randomTimestamp = Math.floor(Math.random() * (now - postCreatedAt + 1)) + postCreatedAt
      comment.commentedAt = { "$numberLong": randomTimestamp.toString() }
    })
  
    return post
  }
  
  // Example usage:
  const post = {
    "_id": { "$oid": "66be89620f35465390dd5fd2" },
    "by": { "$oid": "66be81f0a1530646e953b2b7" },
    "createdAt": { "$numberLong": "1717177199572" },
    "image": "https://picsum.photos/id/13/1500",
    "likes": [],
    "comments": [
      {
        "_id": "670fe977821e",
        "by": { "$oid": "66be81f0a1530646e953b2c4" },
        "likedBy": [
          { "$oid": "66be81f0a1530646e953b2cb" }
          // other likedBy objects
        ],
        "text": "So much fun! 🎉",
        "createdAt": { "$numberLong": "1710901544695" }
      },
      // other comments
    ],
    "title": "Peaceful Moment"
  }
  
  const updatedPost = addCommentTtimestamps(post)
  console.log(updatedPost)
  