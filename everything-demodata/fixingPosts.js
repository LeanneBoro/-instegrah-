import fs from 'fs';

// Generate a random timestamp between now and 6 months ago
function getRandomTimestamp() {
  const now = Date.now();
  const sixMonthsAgo = now - (6 * 30 * 24 * 60 * 60 * 1000); // Approximate 6 months in milliseconds
  return Math.floor(Math.random() * (now - sixMonthsAgo)) + sixMonthsAgo;
}

// Read JSON data from the file
const inputFilePath = 'data.json';
const outputFilePath = 'updatedData.json';

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Update the createdAt field to be a timestamp
  jsonData.forEach(post => {
    post.createdAt = getRandomTimestamp(); // Update createdAt to a random timestamp
    if (post.comments) {
      post.comments.forEach(comment => {
        comment.createdAt = getRandomTimestamp(); // Update createdAt in comments
      });
    }
  });

  // Write the updated JSON data to a new file
  fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Updated data has been written to', outputFilePath);
  });
});