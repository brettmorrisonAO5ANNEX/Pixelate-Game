const searchButton = document.getElementById("search-button");
// searchButton.addEventListener("click", () => {
// const searchTerm = document.getElementById("search-bar").value;
// const apiKey = "AIzaSyAl18z3QWlMhFOukRi49_55qow1l4z7Yy0";
// const cseId = "7594941fb0a0b4caf";
// const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${searchTerm}&searchType=image`;

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         // handle the search results here
//         const searchResults = document.getElementById("search-results-container");
//         searchResults.innerHTML = ""; // clear previous search results
        
//         const items = data.items;
//         if (items && items.length > 0) {
//           // create a grid of images
//           const grid = document.createElement("div");
//           grid.classList.add("grid");
//           for (const item of items) {
//             const img = document.createElement("img");
//             img.src = item.image.thumbnailLink;
//             img.alt = item.title;
//             img.classList.add("grid-item");
//             grid.appendChild(img);
//           }          
//           searchResults.appendChild(grid);
//         } else {
//           // display a message when there are no results
//           searchResults.textContent = "No results found.";
//         }
      
//         console.log("received results");
//         modal.classList.toggle("hidden"); // toggle the modal display
//       })
      
//     .catch(error => console.log(error));
// });

//temporary for testing
function displaySearchResultsMessage(query) {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = ""; // clear previous search results
    const message = document.createElement('p');
    message.innerText = `Showing results for "${query}"`;
    searchResultsContainer.appendChild(message);
  }
  

document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById("search-bar").value;
    const searchResults = document.getElementById("search-results-container");
    searchResults.innerHTML = ""; // clear previous search results
    displaySearchResultsMessage(searchInput);
    modal.classList.toggle("hidden"); // toggle the modal display
});
  