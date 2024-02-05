document.addEventListener('DOMContentLoaded', function () {
  // Get the data-page attribute value
  const currentPage = document.body.dataset.page;

  // RestDB API key
  const APIKEY = "65b735da5a960fa8fe7795a4";

  // Declare processData function in the outer scope
  function processData(data) {
    return `<p>${data.setup}<br>${data.punchline}</p>`;
  }


    if (currentPage === 'index-page') {
      function openPopup() {
        document.getElementById('popup').style.display = 'flex';
    }
    
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }
    
    }
  // Check which page we're on and execute specific code
  // Codes for loading-page
  else if (currentPage === 'loading-page') {
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
          window.location.href = "game.html"; // Replace with the redirected page URL
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

    squares.forEach(square => {
      square.addEventListener('mousedown', () => {
        if (square.id == hitPosition){
          const isChildHoodSnack = childHoodSnacks.some(image => square.style.backgroundImage.includes(image));
          const isOtherThings = otherThings.some(image => square.style.backgroundImage.includes(image));
          
          if (isChildHoodSnack){
            playSound('soundEffect.mp3');
            result = result + 10; // Add points when a childHoodSnack element is clicked
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
      var jsondata = {
        "username": username,
        "email": email,
        "score": result
      };

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

      fetch(`https://fedassg2-98b9.restdb.io/rest/leaderboards/${id}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
      if (currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
        updateScore(id, username, email, result);
      }
    }

    let countDownTimerId = setInterval(countDown, 1000)

  } else if (currentPage === 'form-page'){
    document.getElementById("player-submit").addEventListener("click", function(e) {
      e.preventDefault();

      // Username and email entry
      let id = "";
      let username = "";
      let email = "";
      let contentList = [];
      username = document.getElementById("username").value;
      email = document.getElementById("email").value;

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
      
      fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards", settings)
        .then(response => response.json())
        .then(response => {

          contentList = response.map(item => [item.username, item.email]);
          let existingUsernameSet = contentList.filter(list => list[0] === username);
          let existingEmailSet = contentList.filter(list => list[1] === email);
          if (username == "" && email == ""){
            console.log("Username and email are empty.");
            alert("Please enter a username and email.");        
          } else if (existingUsernameSet.length > 0 && existingEmailSet.length > 0 && existingUsernameSet[0][1] !== email) {
            console.log("Both username and email exist in different sets.");
            alert("Invalid combination. Please try other combinations.");
          } else if (existingUsernameSet.length > 0 && existingEmailSet.length > 0 && existingUsernameSet[0][1] === email){
            console.log("Both username and email exist together. Proceeding to the next step.");
            // Redirection to be added here
            // Retrieve the player's id from the response
            const existingPlayer = response.find(item => item.username === username);
            id = existingPlayer._id;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('id', id);
            setTimeout(() => {
              window.location.href = "loading.html";
            }, 3000);
          } else if (existingUsernameSet.length > 0) {
            alert("Username already exists. Please enter a different username.");
          } else if (existingEmailSet.length > 0) {
            alert("Email already exists. Please enter a different email.");
          } else {
            var jsondata = {
              "username": username,
              "email": email,
              "score": 0
            };

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

            fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards", settings)
              .then(response => {
                if (!response.ok){
                  throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
              })
              .then(data => {
                console.log(data);
                let id = data._id;
                localStorage.setItem('id', id);
                console.log(id);
              })
              .catch(error => {
                console.error(error);
              })
            console.log('Success yeahh')
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            setTimeout(() => {
              window.location.href = "game.html";
            }, 3000);
          }
        })
      })     
  } else if (currentPage === "leaderboards-page"){
    // get all the records from the database
    // if only have less than 10 records, just show them all
    // if have more than 10, compare score, then only take top 10
    // put them in the leaderboards
    // the problem now is i want the top 3 to have different colours
    // 4-6 will have white or grey

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

    fetch("https://fedassg2-98b9.restdb.io/rest/leaderboards?sort=score&dir=-1", settings)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let topRecords = response.slice(0, 10);
        let tbody = document.getElementById('player-list').getElementsByTagName('tbody')[0];

        for (let i = 0; i < topRecords.length; i++){

          let player = topRecords[i];
          let row = document.createElement('tr');

          row.innerHTML = `<td>${i + 1}</td><td>${player.username}</td><td>${player.score}</td>`;

          if (i === 0){
            row.classList.add('top1');
          }
          else if (i === 1){
            row.classList.add('top2');
          }
          else if (i === 2){
            row.classList.add('top3');
          }
          else{
            row.classList.add('normal');
          }

          tbody.appendChild(row);

          console.log(topRecords[i])
        }
      });
  }
});
