// script.js

document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value.trim();

    if (!query) {
      document.getElementById('searchResults').innerHTML = `<p>Search a movie or tv show.</p>`;
      return;
    }
  
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=654df2d9`)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); 
  
        if (data.Response === 'True') {
          displayResults(data.Search);
        } else {
          document.getElementById('searchResults').innerHTML = `<p>No results found for "${query}".</p>`;
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('searchResults').innerHTML = `<p>There was an error processing your request.</p>`;
      });
  });
  

  function displayResults(movies) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-item');
  
      movieDiv.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}" />
        <div>
          <h3>${movie.Title}</h3>
          <p>Type: ${movie.Type}</p>
          <p>Year: ${movie.Year}</p>
        </div>
      `;
      resultsContainer.appendChild(movieDiv);
    });
  }
  