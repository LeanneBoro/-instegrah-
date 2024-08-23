import fs from 'fs'

// Load the JSON file
const data = JSON.parse(fs.readFileSync('instegram.post.json', 'utf8'))

// Helper function to generate a random timestamp between two dates
const getRandomTimestamp = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const now = new Date()

data.forEach(post => {
  const postCreatedAt = new Date(parseInt(post.createdAt.$numberLong, 10))
  
  post.comments.forEach(comment => {
    const randomTimestamp = getRandomTimestamp(postCreatedAt, now)
    comment.createdAt = { $numberLong: randomTimestamp.getTime().toString() }
  })
})

// Write the updated data back to a JSON file
fs.writeFileSync('updated_instegram.post.json', JSON.stringify(data, null, 2), 'utf8')

console.log('Updated JSON file has been saved as updated_instegram.post.json')
