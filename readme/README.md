# FED-Assignment
This is our FED Assignment 2 project.
Note: 
For video walkthrough, please refer to the submission on BrightSpace.
Please extract the file from the zip file to prevent errors.

# Yum Yum Trek - Embark to the land of your favourite childhood snacks!

Our chosen theme is Theme 5 - Gamer Crazy.
It is a modified and improved version of the classic game "Whac-A-Mole" that integrates Singapore's favourtite childhood snacks.

Our target audience are anyone who shares a Singaporean childhood, bonding over their favourite local snacks.

Our interpretation and manifestation of the theme, Gamer Crazy, actually stem from us wanting to help a local kopitiam that sells childhood snacks to promote the abundance of childhood snacks that they sell and thus improving customer traffic at the kopitiam. We have partnered up with the kopitiam in the implementation of the game, where we handle the game implementation and logic and the kopitiam will giveaway free childhood snacks to top 3 players that has the highest scores.

From that purpose, combined with our chosen theme, Gamer Crazy, we want to make a game that is relatable to our target audience and let them relive their precious childhood experiences. Together with the process, we want to simultaneously improve the business of the kopitiam. After several rounds of thorough considerations, we have decided to make a simple game incorporating the classic game "Whac-A-Mole" centered around childhood snacks that the kopitiam sells.

This game is designed to be simple yet engaging for players all of ages. Thus, mechanism of the game is easy to grasp and quite direct from the landing page all the way until the leaderboard page.

To start players off, we have made a brief story to give the game a narrative, and the players, something like a storyline to attract player's attention. The story features a local aunty, Aunty Esther, that is very passionate about selling her tidbits and share the joy with her loyal customers. But one day, the customers no longer frequently visit her stall. Most of the customers now prefer fast food over traditional tidbits. Aunty Esther, determined to pass down the love and joy for tidbits to the next generations, embarks on a journey to make traditional tidbits well-known in the local community (and of course, make them feel nostalgic about it, because nostalgia is the best weapon after all :D).

## Design Process

This game follows a traditional game layout that consists of landing page (for the player to navigate to different pages), a form page for new players to sign up, the game page and also a leaderboard page.

For the name of our game, we decided to go with "Yum Yum Trek" as we were inspired by a all-time classic, Star Trek, that was set in 23rd century aboard a starship whose crew was dedicated to exploring the galaxy. In our game's context, it is about journeying down memory lane to when we were still kids and bonded over childhood snacks. We want to give the players a sense of nostalgia and develop appreciation for our local childhood snacks.

We chose black as our background colour to simulate the outer space feel. We want to make the players feel like they are exploring the world of childhood snacks in the vast outer space. Besides that, with a black background, other elements of the game will stand out and players will be able to focus on the main elements of the game, which is childhood snacks/tidbits.

For the animated background, we have two variations. The first variation is the one on the landing page, which are two orbs randomly floating in the black background. The second variation is the particle background which can be found on pages like the game page. Both of these implementations serve to beautify the game interface and at the same time, give the game a sci-fi feel, which suits our theme of outer space.

We have a space-themed loading page with jokes that are randomly generated give players a good laugh and to ease their nerves before the game starts!

Our game also uses a lot of neon lights in the design. One such example can be seen on the buttons at the landing page. When the player hovers over it, it will transition to have a neon frame. For the "Whac-A-Mole" (in this case, the mole are the childhood snacks) game grid, it glows neon yellow too! We utilise the neon lighting element in our game to give it a futuristic feel and also again, to fit the outer space theme.

The leaderboard colour scheme is chosen based on the rank of the player. For the top 3 players with the highest score, they have gold, silver and bronze backgrounds. For 4th until 10th rank, we decided to use a dark colour to make the top 3 stand out among all the players.

The wireframe of this website is done in desktop, tablet and mobile view using Figma. The link to the Figma page is provided as follows and the wireframe with explanation and rationale (a Word document) can be accessed in GitHub.

Link to the Figma wireframe: 
----------Add new link!--------------
https://www.figma.com/file/VIWox7Us74AJvXMJfrAwyZ/FED-Assignment-1-Low-Fidelity-Wireframe?type=design&node-id=0%3A1&mode=design&t=o9vX1bnDl0Tee69i-1

## Features

- The first part of the game is the landing page (index.html). It contains the title of the game and a short description, along with 2 buttons (Start and Help). When the player press the Start button, he/she will be redirected to the form page to fill up their username and email that will be used to claim their prize (for top 3 players with highest score). When the player press the Help button, a popup about the game story and brief gameplay guide will show up. This gives the player an idea about the game before they start playing.

- The second part of the game is the form page (form.html). Players that have pressed the Start button will be redirected to this page to enter their username and email for prize claiming if they are the top 3 highest scoring players. The player will not be redirected to the game page if the username or email already existed in the database or if both the fields are left empty. The player will be redirected only if they enter a valid username-email pair that exists in the database or an entirely new username-email pair that does not exist in the database. There will also be input validation so that the correct information can be sent to the database.

- The third part is the loading page (loading.html). It has lottie implementation together with a randomly generated joke using API to entertain the player while the game redirects the player to the game page.

- The fourth part of the game is the game page (game.html). This page consists of 2 parts, the first part being the player score and remaining time, and the second part being the 3x3 game grid. Whenever the player hits a childhood snack, there will be a sound effect played and the player's score will increase by 10 per childhood snack hit. As for the fast food, it will be game over for the player even if one is hit. The alternative way to game over is to survive until the timer runs out. When a game is over, an alert will pop up. Players are to acknowledge the alert before the game redirects them to the leaderboard page. Note that every game has random speed set, so this game is a combination of skill and luck. This is to make it a bit more unpredictable, thus making the game a tad more engaging.

- The last part of the game is the leaderboard page (leaderboard.html). This page shows the top 10 performers in the game, ranked from the player that scored highest to lowest (limited to 10 players shown). The top 3 players will have their username and score presented in gold, silver and bronze background respectively, while others will have a dark blue background. This is to highlight the top performers and encourage other players to challenge them and break the new high score.

### Future outlooks to improve the game

- Customized cursor - Let players interact with random elements of the game and add to the aesthetic of the game.

- Difficulty level - To let players challenge themselves and giving them a higher chance to win the prize or upgrade the quality of the prize.

- Easter eggs - Make the game a bit more explorable so that players spend more time playing the game and always have something to look forward to other than the main game itself.

## Technologies Used

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
    - The project uses **HTML** to make the framework of the game.

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
    - The project uses **CSS** to style the game to be more aesthetic and user-friendly.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    - The project uses **JavaScript** to add interactive elements and input validations to the input boxes in the game. It is also used to implement interactive backgrounds and handle player interactions.

- [Figma](https://www.figma.com/)
    - The project uses **Figma** to plan and make the wireframe of the game in different screen sizes.

- [GitHub](https://github.com/)
    - The project uses **GitHub** to store and share the game.

## Testing

1. Sign up form:
    1. Go to the form page.
    2. Try to submit the empty form and verify that an error message about the required fields appears.
    3. Try to submit the form without any username or email input and verify that an error message about this occurs.
    4. Try to submit the form with invalid username format and verify that a relevant error message appears.
    5. Try to submit the form with invalid email format and verify that a relevant error message appears.
    6. Try to submit the form with an existing player's username and email and verify that the player is redirected to the loading page.
    7. Try to submit the form with a new player's username and email and verify that a success message appears.

Project looks

- On desktop and tablet, the div blocks containing the contents are aligned horizontally across the webpage.

- On mobile, the div blocks containing the contents are aligned vertically as the mobile screen size is smaller than the desktop and tablet screen size and viewed vertically as opposed to horizontally on the desktop and tablet screen size.

## Credits

### Content
- As this is a game created based on a fictional story and situation, the content of this game are from ideas of our own that is designed to support the local kopitiam business and promote traditional childhood snacks to fellow Singaporeans who bonded over these snacks during their childhood.

### Media
- The photos used in this site were obtained from ...

- Background slideshow image 1
    - (https://www.tinycurl.co/wp-content/uploads/2022/05/blog-frog-amigurumi1.jpg)

- Background slideshow image 2
    - (https://idsb.tmgrup.com.tr/ly/uploads/images/2020/07/28/48860.jpg)

- Background slideshow image 3
    - (https://curiouspapaya.com/cdn/shop/articles/2_413d2269-83fe-4aa4-b6cf-2ef4987ba50a.png?v=1683949534)

- Image on about.html
    - (https://www.cambridgeindependent.co.uk/_media/img/750x0/8I5BY42FKF41Y4TINB4W.jpg)

- Image 1 on project.html
    - (https://i.etsystatic.com/18200874/r/il/89b24d/3633608213/il_1080xN.3633608213_dciv.jpg)

- Image 2 on project.html
    - (https://laughingsquid.com/wp-content/uploads/2013/10/SquidTree.jpg)

- Image 3 on project.html
    - (https://images.prismic.io/lc-yarn/794439b2-d737-42a3-8479-aeaf92c7bccf_kfi+indulgence+kettle+dyed+fingering.jpg?auto=compress,format&rect=0,0,1000,590&w=1000&h=590)

- Image on contact.html
    - (https://i.insider.com/60352a14bed5c50011a2c0c9?width=700)

### Acknowledgements

- We got the inspiration for this project from our love of childhood snacks and how food seems to be an effective way to bond with each other. From there, we wanted to manifest this idea in a Singaporean context that is more relatable to us and our target audience.
