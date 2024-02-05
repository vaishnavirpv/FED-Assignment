document.addEventListener('DOMContentLoaded', function () {
  // Get the data-page attribute value
  const currentPage = document.body.dataset.page;

  // RestDB API key
  const APIKEY = "65b735da5a960fa8fe7795a4";

  // Declare processData function in the outer scope
  function processData(data) {
    return `<p>${data.setup}<br>${data.punchline}</p>`;
  }

  // Landing page JS implementation (index.html)
  if (currentPage === 'index-page'){
    // When press Help button, open tutorial popup
    document.getElementById('help-btn').addEventListener('click', openPopup);

    // When press Close button in the popup, exit popup
    document.getElementById('close-btn').addEventListener('click', closePopup);

    // Function to open popup
    function openPopup(){
      document.getElementById('popup').style.display = 'flex';
    }

    // Function to close popup
    function closePopup(){
      document.getElementById('popup').style.display = 'none';
    }

  // Loading page JS implementation (loading.html)
  } else if (currentPage === 'loading-page') {
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
      });

    // Put the processed data in the div with id loading-text
    function updatePage(htmlContent) {
      const container = document.getElementById('loading-text');
      if (container) {
        container.innerHTML = htmlContent;

        console.log('HTML content updated successfully');

        // Set a timeout for redirection to game page after 10 seconds
        setTimeout(function () {
          console.log('Setting window location');
          window.location.href = "game.html";
        }, 10000);
      } else {
        console.error('Container with ID "loading-text" not found');
      }
    }

    console.log('Running code for loading page');

    // Game page JS implementation (game.html)
  } else if (currentPage === 'game-page') {
    // Finding all squares and store it under squares
    const squares = document.querySelectorAll('.square');

    // Store the mole in mole using querySelector as there is only going to be one mole at a time
    const mole = document.querySelector('.mole');

    // Search an element with an id 'time-left', store it in timeLeft
    const timeLeft = document.querySelector('#time-left');

    // Search an element with an id 'score', store it in score
    const score = document.querySelector('#score');

    // Variable declaration
    let result = 0;
    let hitPosition;
    let currentTime = 60;
    let timerId = null;

    // Store player information in local storage, will overwrite if new player plays
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');

    // Childhood snack images
    const childHoodSnacks = [
      'chupa1.png',
      'eyeglass1.png',
      'mamee1.png',
      'Biscuit.png',
      'RollerCoaster.png'
    ];

    // Other images
    const otherThings = [
      'burger1.png',
      'fries1.png',
      'nuggets.png'
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

    // Game scoring logic
    squares.forEach(square => {
      square.addEventListener('mousedown', () => {
        if (square.id == hitPosition){
          // Check if in a particular box at the time is childhood snack or other things
          const isChildHoodSnack = childHoodSnacks.some(image => square.style.backgroundImage.includes(image));
          const isOtherThings = otherThings.some(image => square.style.backgroundImage.includes(image));
          
          // If childhood snack, play sound effect when hit and add 10 points
          if (isChildHoodSnack){
            playSound('soundEffect.mp3');
            result = result + 10;

            // If hit other things, game over and update score in RestDB
          } else if (isOtherThings){
            clearInterval(countDownTimerId);
            clearInterval(timerId);
            alert('GAME OVER! Your final score is ' + result);
            updateScore(id, username, email, result);
          }
          
          score.textContent = result
          hitPosition = null
        }
      })
    })

    // Function to play sound
    function playSound(soundPath) {
      const soundEffect = new Audio(soundPath);
      soundEffect.play();
    }

    // Update score
    function updateScore(id, username, email, result){
      // Player information in form of JSON
      var jsondata = {
        "username": username,
        "email": email,
        "score": result
      };

      // Settings to update the leaderboard
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://fedassg2-98b9.restdb.io/rest/leaderboards/${id}`,
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "body": JSON.stringify(jsondata)
      };

      // Updating leaderboard and redirect to leaderboard
      fetch(`https://fedassg2-98b9.restdb.io/rest/leaderboards/${id}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          
          // Redirect the game page to leaderboard after 3 seconds
          setTimeout(() => {
            window.location.href = "leaderboard.html";
          }, 3000);
        });
    }

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
      // If timer reaches 0, game over and update score
      if (currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
        updateScore(id, username, email, result);
      }
    }
    let countDownTimerId = setInterval(countDown, 1000)

    // Form page JS implementation (form.html)
  } else if (currentPage === 'form-page'){
    // Event listener for Start button (acts like a submit button to GET and POST information to RestDB)
    document.getElementById("player-submit").addEventListener("click", function(e) {
      e.preventDefault();

      // Variable and array declaration
      let id = "";
      let username = "";
      let email = "";
      let contentList = [];

      // Get the username and email from player input
      username = document.getElementById("username").value;
      email = document.getElementById("email").value;

      // Settings to get all records from RestDB
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fedassg2-98b9.restdb.io/rest/leaderboards",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      console.log(username, email)
      
      // Fetch information from RestDB
      fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards", settings)
        .then(response => response.json())
        .then(response => {
          // Put the information in [username, email] format
          contentList = response.map(item => [item.username, item.email]);

          // Variables for determining if the username and email are a set, e.g. [adam, adam@gmail.com]
          let existingUsernameSet = contentList.filter(list => list[0] === username);
          let existingEmailSet = contentList.filter(list => list[1] === email);

          // If both username and email are empty, alert the player to enter username and email
          if (username == "" && email == ""){
            console.log("Username and email are empty.");
            alert("Please enter a username and email.");

            // If username and email are of different sets, alert the player of invalid combination
          } else if (existingUsernameSet.length > 0 && existingEmailSet.length > 0 && existingUsernameSet[0][1] !== email) {
            console.log("Both username and email exist in different sets.");
            alert("Invalid combination. Please try other combinations.");

            // If username and email is already in RestDB, redirect to loading page
          } else if (existingUsernameSet.length > 0 && existingEmailSet.length > 0 && existingUsernameSet[0][1] === email){
            console.log("Both username and email exist together. Proceeding to the next step.");

            // Retrieve the player's id from the response and store in local storage
            const existingPlayer = response.find(item => item.username === username);
            id = existingPlayer._id;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('id', id);

            // Redirect to loading page after 3 seconds
            setTimeout(() => {
              window.location.href = "loading.html";
            }, 3000);

            // If username already exist, alert the player about it
          } else if (existingUsernameSet.length > 0) {
            alert("Username already exists. Please enter a different username.");

            // If email already exist, alert the player about it
          } else if (existingEmailSet.length > 0) {
            alert("Email already exists. Please enter a different email.");

            // If player is a new player (has not played before), store their information in RestDB
          } else {
            // Player information in JSON format, score defaulted to 0
            var jsondata = {
              "username": username,
              "email": email,
              "score": 0
            };
          
          // Settings to add a new record to RestDB
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://fedassg2-98b9.restdb.io/rest/leaderboards",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
            "processData": false,
            "body": JSON.stringify(jsondata)
            }

            // Add a new record to RestDB
            fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards", settings)
              .then(response => {
                if (!response.ok){
                  throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
              })
              .then(data => {
                console.log(data);
                // Storing the record id to local storage
                let id = data._id;
                localStorage.setItem('id', id);
                console.log(id);
              })
              .catch(error => {
                console.error(error);
              })
            console.log('Success yeahh')
            // Storing username and email to local storage
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);

            // Redirect to game page after 3 seconds
            setTimeout(() => {
              window.location.href = "game.html";
            }, 3000);
          }
        })
      })
    
    // Leaderboard page JS implementation (leaderboard.html)
  } else if (currentPage === "leaderboards-page"){
    // Settings to get infromation from RestDB for the leaderboard
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fedassg2-98b9.restdb.io/rest/leaderboards",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      }
    };

    // Getting the information from RestDB
    fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards?sort=score&dir=-1", settings)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        // Get top 10 records with the highest score
        let topRecords = response.slice(0, 10);
        let tbody = document.getElementById('player-list').getElementsByTagName('tbody')[0];

        for (let i = 0; i < topRecords.length; i++){
          // Creating and displaying the selected records, formatting them in HTML notation
          let player = topRecords[i];
          let row = document.createElement('tr');

          row.innerHTML = `<td>${i + 1}</td><td>${player.username}</td><td>${player.score}</td>`;

          // If 1st place, add class top1 into the HTML notation
          if (i === 0){
            row.classList.add('top1');
          }
          // If 2nd place, add class top2 into the HTML notation
          else if (i === 1){
            row.classList.add('top2');
          }
          // If 3rd place, add class top3 into the HTML notation
          else if (i === 2){
            row.classList.add('top3');
          }
          // For 4th to 10th place, add class normal into the HTML notation
          else{
            row.classList.add('normal');
          }

          // Displaying the rows
          tbody.appendChild(row);

          console.log(topRecords[i])
        }
      });
  }
});
