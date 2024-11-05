let snakeEat = document.getElementById("snake_eat");
let snakeDied = document.getElementById("snake_died");
let gamesound = document.getElementById("game_sound");
let biteMe = document.getElementById("bite_me");
let winSound = document.getElementById("win_sound");

// when snake eats
snake_eat.volume = 0.5;
snake_eat.play();

// when snake dies
snake_died.volume = 0.5;
snake_died.play();

// BGM
gamesound.volume = 0.5;
gamesound.play();
gamesound.pause();

// when bite itself
biteMe.volume = 0.4;
biteMe.play();
biteMe.pause();

winSound.volume = 0.4;
winSound.play();