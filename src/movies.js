// Array of movies for PookieFlix
// Each movie is an object with id, title, url, thumbnail, and AI-generated info

import aashiqui2Img from './assets/aashiqui2.jpg';

export const movies = [
  {
    id: 1,
    title: "Aashiqui 2",
    url: "1l21EsmnuqiMPF_REm8EG4GtJI8AMQrf6",
    thumbnail: aashiqui2Img,
    genre: "Romance/Drama",
    rating: "8.0",
    year: 2013,
    cast: [
      { name: "Aditya Roy Kapur", image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Aditya_Roy_Kapur_at_the_Bollywood_Hungama_Style_Icons_Awards_2023.jpg" },
      { name: "Shraddha Kapoor", image: ""}],
    duration: "130 min",
    summary: "A talented musician and a nightclub performer fall in love, but their relationship faces challenges as they pursue their dreams in the music industry."
  },
  {
    id: 2,
    title: "Untitled",
    url: "YOUR_FILE_ID_2",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    genre: "Drama",
    rating: "9.3",
    year: 1994,
    cast: [
      { name: "Coming Soon", image: "https://images.unsplash.com/photo-1535713214d7e6b88b29bd43e1df4d1d20e1a56bb?w=150&h=150&fit=crop" }
    ],
    duration: "-- min",
    summary: "Content coming soon. Add your movie details here."
  },
  {
    id: 3,
    title: "Untitled",
    url: "YOUR_FILE_ID_3",
    thumbnail: "https://images.unsplash.com/photo-1559329007-40790c361539?w=400&h=600&fit=crop",
    genre: "Action/Thriller/Sci-Fi",
    rating: "8.8",
    year: 2010,
    cast: [
      { name: "Coming Soon", image: "https://images.unsplash.com/photo-1535713214d7e6b88b29bd43e1df4d1d20e1a56bb?w=150&h=150&fit=crop" }
    ],
    duration: "-- min",
    summary: "Content coming soon. Add your movie details here."
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
