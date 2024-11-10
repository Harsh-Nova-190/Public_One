window.addEventListener('keydown', function(event){

    if(event.key === 'ArrowUp') Snake.moveUp();
    else if(event.key === 'ArrowDown') Snake.moveDown();
    else if(event.key === 'ArrowLeft') Snake.moveLeft();
    else if(event.key === 'ArrowRight') Snake.moveRight();
    
});


window.addEventListener('load', function(){
    const canvas = document.getElementById('casvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    ctx.font = '30px Ariel';
    ctx.textBaseline = 'top';

    canvas.addEventListener('click', () => {
        if(GAME.gameOver){
            gameRestart();
            GAME.loop = this.setInterval(animate, 150);
        }
    })

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Snake.draw(ctx);
        Snake.update();
        Food.draw(ctx);

        if(GAME.gameOver){
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.font = '60px Ariel';
            ctx.font = '40px "Press Start!"';
            ctx.fillText('GAME OVER!', GAME.width * 0.5, GAME.height * 0.5, GAME.width * 95);
            ctx.font = '20px"Press Start!"';
            ctx.fillText('Click here to Restart!', GAME.width * 0.5, GAME.height * 0.6);
            clearInterval(GAME.loop);
        }
    }

    GAME.loop = setInterval(animate, 150);

});