// API URL to get anime data from Jikan (e.g., "Top Anime" from MyAnimeList)
const apiUrl = 'https://api.jikan.moe/v4/top/anime';

// Function to fetch anime data from the API
async function fetchAnimeData() {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Extract the anime array from the API response
    const animeList = data.data;

    // Display the anime list using the API data
    displayAnimeList(animeList);
  } catch (error) {
    console.error('Error fetching anime data:', error);
    // Display error message to users
    document.getElementById('anime-container').innerHTML = '<p>Failed to load anime data. Please try again later.</p>';
  }
}

// Function to create an anime card element
function createAnimeCard(anime) {
  const animeItem = document.createElement('div');
  animeItem.classList.add('anime-item');

  // Anime title
  const animeTitle = document.createElement('h4');
  animeTitle.textContent = anime.title;
  animeItem.appendChild(animeTitle);

  // Anime description
  const animeDescription = document.createElement('p');
  animeDescription.textContent = anime.synopsis ? anime.synopsis : 'No description available.';
  animeItem.appendChild(animeDescription);

  // Anime image
  const animeImage = document.createElement('img');
  animeImage.src = anime.images.jpg.large_image_url;
  animeImage.alt = anime.title;
  animeImage.classList.add('anime-image');
  animeItem.appendChild(animeImage);

  return animeItem;
}

// Function to display the anime list
function displayAnimeList(animeList) {
  const animeContainer = document.getElementById('anime-container');

  // Clear any existing content (useful for re-rendering)
  animeContainer.innerHTML = '';

  // Loop through each anime and create a card
  animeList.forEach(anime => {
    const animeCard = createAnimeCard(anime);
    animeContainer.appendChild(animeCard);
  });

  // Hide the loader once content is loaded
  document.getElementById('loader').style.display = 'none';
}

// Function to simulate data loading with a loading animation
function loadAnimeData() {
  // Show the loader while fetching the data
  document.getElementById('loader').style.display = 'block';
  
  // Fetch and display the anime data
  fetchAnimeData();
}

// Show the loader initially
document.addEventListener('DOMContentLoaded', () => {
  loadAnimeData();
});
