document.addEventListener('DOMContentLoaded', function () {
  // Get the data-page attribute value
  const currentPage = document.body.dataset.page;

  // Declare processData function in the outer scope
  function processData(data) {
    return `<p>${data.setup}<br>${data.punchline}</p>`;
  }

  // Check which page we're on and execute specific code
  // Codes for loading-page
  if (currentPage === 'loading-page') {
    // Lottie javascript
    var url = 'https://official-joke-api.appspot.com/random_joke';

    // Fetching from official joke API website
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Convert data to HTML notation
        const htmlContent = processData(data); // Function to process your data
        // Pass HTML back to the HTML file
        updatePage(htmlContent); // Function to update the page with HTML

        console.log('API data loaded successfully');
      })
      .catch(error => {
        console.error('Error fetching API:', error);
        // Handle errors and possibly redirect on error if needed
      });

    // Put the processed data in the div with id loading-text
    function updatePage(htmlContent) {
      const container = document.getElementById('loading-text');
      if (container) {
        container.innerHTML = htmlContent;

        console.log('HTML content updated successfully');

        // Set a timeout for redirection after 10 seconds
        setTimeout(function () {
          console.log('Setting window location');
          window.location.href = "https://www.np.edu.sg"; // Replace with the redirected page URL
        }, 10000);
      } else {
        console.error('Container with ID "loading-text" not found');
      }
    }

    console.log('Running code for loading page');

    // Code for game-page
  } else if (currentPage === 'game-page') {
    // Finding all squares and store it under squares
    const squares = document.querySelectorAll('.square');

    // Store the mole in mole using querySelector as there is only going to be one mole at a time
    const mole = document.querySelector('.mole');

    // Search an element with an id 'time-left', store it in timeLeft
    const timeLeft = document.querySelector('#time-left');

    // Search an element with an id 'score', store it in score
    const score = document.querySelector('#score');

    let result = 0;
    let hitPosition;
    let currentTime = 60;
    let timerId = null;

    // Childhood snack images
    const childHoodSnacks = [
      'chupa1.png',
      'eyeglass1.png',
      'mamee1.png'
    ];

    // Other images
    const otherThings = [
      'burger1.png',
      'fries1.png'
    ];

    // Function to get a random square to put the mole
    function randomSquare() {

      // Make sure we have a fresh slate to put our mole
      squares.forEach(square => {
        square.classList.remove('mole');
        square.style.backgroundImage = '';
      });

      // Pass through a random number into it
      let randomSquareIndex = Math.floor(Math.random() * 9);
      squares[randomSquareIndex].classList.add('mole');

      let randomImage;
      if (Math.random() < 0.8) {
        randomImage = childHoodSnacks[Math.floor(Math.random() * childHoodSnacks.length)];
      } else {
        randomImage = otherThings[Math.floor(Math.random() * otherThings.length)];
      }

      // Set the background image of the mole
      squares[randomSquareIndex].style.backgroundImage = `url('${randomImage}')`;

      hitPosition = squares[randomSquareIndex].id;
    }

    squares.forEach(square => {
      square.addEventListener('mousedown', () => {
        if (square.id == hitPosition){
          const isChildHoodSnack = childHoodSnacks.some(image => square.style.backgroundImage.includes(image));
          const isOtherThings = otherThings.some(image => square.style.backgroundImage.includes(image));
          
          if (isChildHoodSnack){
            result++; // Add points when a childHoodSnack element is clicked
          } else if (isOtherThings){
<<<<<<< HEAD
            clearInterval(countDownTimerId);
            clearInterval(timerId);
            alert('GAME OVER! Your final score is ' + result);
=======
            // End the game immediately if an "otherThings" element is clicked
              clearInterval(countDownTimerId);
              clearInterval(timerId);
              alert('GAME OVER! Your final score is ' + result);
              return; // Exit the event listener
>>>>>>> a3c2ee6c356607ec98c30d7354b21dc4e285651d
          }
          
          score.textContent = result
          hitPosition = null
        }
      })
    })

    // Moving the mole
    function moveMole() {
      timerId = setInterval(randomSquare, getRandomInterval());
      console.log(getRandomInterval());
    }

    // Calculate a random duration between 500ms and 800ms
    function getRandomInterval() {
      return Math.floor(Math.random() * (800 - 500 + 1) + 500);
    }

    // Call moveMole method
    moveMole()

    // Countdown function
    function countDown() {
      currentTime--
      timeLeft.textContent = currentTime
      if (currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
      }
    }

    let countDownTimerId = setInterval(countDown, 1000)
  }
});