# HUNGRY HAMSTER 2048
#### Video Demo: https://youtu.be/-0khUgrNxJs
# Description:
## Overview
Hungry Hamster 2048 is an engaging twist on the classic 2048 game. Instead of merging numbered tiles, you merge hungry hamsters, achieving increasing levels of hunger!
The inspiration for the project is an interesting interaction with the A.I DALL-E.<br>
Check the entire conversation in the following link:
https://www.reddit.com/r/ChatGPT/comments/185u141/blah_blah_blah_hungrier_hamster/.<br>
This project is created as a final project for the CS50x course.

## Features

- **Classic 2048 Gameplay:** The core mechanics of 2048 are preserved with a twist - instead of numbers, you merge hungry hamsters.
- **Hungry Hamsters:** Each tile represents a different hamster. When two identical hamsters merge, they create a new, hungrier, version.
- **Winning Condition:** Just like in the classic 2048, the goal is to create a tile with a specific value or item.
- **Animations:** Animations enhance the user experience when tiles merge or new tiles appear.
- **Win Screen:** A win screen appears when the player reaches 2048.
- **Scoring:** Your score increases with each merge, and the high score is tracked and displayed below the board.
- **Highscore Tracking:** The game tracks and displays the high score, so you can compete against your previous best scores.
- **Random Phrases:** Random phrases appear on the screen during merges, adding an extra layer of engagement.

## Files
- index.html: The main HTML file that sets up the game structure. The index page sets up the structure of the page. It links with the CSS file and the javascript file. I have used an @import command with an URL to google fonts to add a custom font called Creepster. Using links, the program pre-loads the images to enable smoother transitions when the images first show up in the game. The HTML creates a heading 1, a div that defines the board. There is also a div containing the score and high-score fields. Two hidden divs called "game-over" and "win-screen" are initially set to 'none' display, until the player loses or wins the game.
- style.css: The CSS file that styles the game board, tiles, and various game elements. Some cool CSS features I enjoyed applying were the transitions and animations. Each time a new basic tile appears, a class "new" is added to it so it has a pop-in effect, right after, the class is removed. I was able to also use animations with the popup-text class, for the phrases that appear on screen. Within the CSS file we also have the styling for each class of tile, enabling 13 different images to be used as background.
- script.js: The JavaScript file containing the game logic, including tile movements, merging logic, win condition, and high score tracking. Within the Javascript file, we have the setGame function, which creates the board with 16 divs, also setting an id for each of them. The updateTile function is responsible for changing the tile's class, which adjusts it's background accordingly. Here we also have eventlisteners for each key direction. The slide(row) function is basically responsible for combining adjacent elements that have the same value. To check if a move is valid, I have implemented the "copyArray" and "arraysEqual" functions. If the board stays the same after a movement is called, that move was not valid and so the player must try another direction. <br>The slideUp / Left / Right / Down functions work basically the same. The function iterates over each row, using the slide(row) function to combine elements. Here, we also update each row style and check if the move was valid. One important point here is that logic for each direction is the same, we just need to reverse and/or transpose the rows so we have the desired effect in each direction. <br>The setTwo function selects a random empty cell and adds a 2 to it. The "new" class is added to enable transition effects. The checkForGameOver function checks the board for empty spaces, then if there are any horizontal elements that are equal and can be combined and then checks for vertical elements that can be combined. If none of the 3 options are available, the player has no possible moves and the game is over. The showPopupText function is responsible for the phrases that appear on the screen, two variables are used to set a random position every time they appear.
- img/: A directory containing images of the hamsters used in the game.

## How to Play
- Start the Game: Open the index.html file in your browser.
- Move Tiles: Use the arrow keys to move the tiles on the board.
- Merge Tiles: When two identical tiles collide, they merge into a new item.
- Win: Achieve the winning condition by creating the highest possible food item.

## License
This project is licensed under the MIT License.

Thank you for playing Hungry Hamster 2048!
