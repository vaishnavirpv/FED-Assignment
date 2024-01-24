// Lottie javascript
var url = 'https://official-joke-api.appspot.com/random_joke';

// Fetching from official joke api website
fetch(url)
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    // Convert data to HTML notation
    const htmlContent = processData(data); // Function to process your data
    // Pass HTML back to the HTML file
    updatePage(htmlContent); // Function to update the page with HTML
  })
  .catch(error => console.error(error)); // Handle errors

  // Creating the string in the html markup
  function processData(data) {
    let htmlString = '';
    htmlString = `<p>${data.setup}<br>${data.punchline}</p>`;
    return htmlString;
  }

  // Put the processed data in the div with id loading-text
  function updatePage(htmlContent) {
    const container = document.getElementById('loading-text');
    container.innerHTML = htmlContent;
  }

console.log('Need to wait');

setTimeout(function() {
  console.log('setting window location');
  window.location.href = "https://www.np.edu.sg"; // to be changed to the redirected page
}, 6000);