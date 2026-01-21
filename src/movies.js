// Array of movies for PookieFlix
// Each movie is an object with id, title, and url properties

export const movies = [
  {
    id: 1,
    title: "Aashiqui 2 ❤️",
    // Just paste the file ID here (the long string after id= in your Google Drive URL)
    url: "1l21EsmnuqiMPF_REm8EG4GtJI8AMQrf6"
  },
  {
    id: 2,
    title: "Movie 2",
    url: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_2"
  },
  {
    id: 3,
    title: "Movie 3",
    url: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_3"
  }
];

// HOW TO GET MOVIES FROM YOUR GOOGLE DRIVE FOLDER:
//
// Step 1: Open your Google Drive folder containing all movies
//
// Step 2: For EACH movie file:
//   - Right-click on the video file
//   - Click "Share" or "Get link"
//   - Set permission to "Anyone with the link" (Viewer)
//   - Copy the link
//
// Step 3: Extract the File ID from the link:
//   Your link will look like one of these:
//   https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID_HERE
//
//   The FILE_ID is the long string of letters and numbers.
//   Copy just that part (for example: 1ABCdefGHIjklMNOpqrsTUVwxyz123456)
//
// Step 4: Convert to playable URL format:
//   Replace FILE_ID_HERE with your actual file ID:
//   https://drive.google.com/uc?export=view&id=FILE_ID_HERE
//
//   OR use this format (preview):
//   https://drive.google.com/file/d/FILE_ID_HERE/preview
//
// Step 5: Add to the movies array below with this format:
//   {
//     id: 4,  // Use the next number (1, 2, 3, 4, 5, etc.)
//     title: "Your Movie Name",  // The actual name of your movie
//     url: "https://drive.google.com/uc?export=view&id=YOUR_ACTUAL_FILE_ID"
//   }
//
// Example:
//   If your Google Drive link is:
//   https://drive.google.com/file/d/1ABCdefGHIjklMNOpqrsTUVwxyz123456/view
//
//   Then your movie object would be:
//   {
//     id: 4,
//     title: "The Great Adventure",
//     url: "https://drive.google.com/uc?export=view&id=1ABCdefGHIjklMNOpqrsTUVwxyz123456"
//   }
//
// IMPORTANT TIPS:
// - Make sure each video file is set to "Anyone with the link can view"
// - Each movie needs a unique id number
// - Add a comma after each movie object (except the last one)
// - Replace the example movies above with your actual movies
