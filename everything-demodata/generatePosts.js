// Import the necessary modules
import { writeFile } from 'fs/promises';

// Import your functions and data
import { generateAllPosts } from './demoData.js'; // Adjust the path as needed

// Function to save data to a JSON file
async function savePostsToFile() {
    try {
        const allPosts = generateAllPosts(); // Generate the posts
        const filePath = './posts.json'; // Specify the file path

        // Write the data to the JSON file
        await writeFile(filePath, JSON.stringify(allPosts, null, 2), 'utf8');

        console.log('Posts have been saved to posts.json');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

// Execute the function
savePostsToFile();