const Snake = {
    position: {x: 0, y: Math.floor(ROWS/2)},
    velocity: {x: 1, y: 0},
    length: 4,
    segments: [],
    score: 0,
    image: document.getElementById('snake_model'),
    sprintWidth: 200,
    spriteHeight: 200,
    draw(context){
        this.segments.forEach((segment, i) => {
            if (i == 0) context.fillStyle = 'gold';
            else context.fillStyle = 'magenta';
            // context.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE),

            this.setSprintFrame(i);

            context.drawImage(this.image, segment.frameX * this.sprintWidth, segment.frameY * this.spriteHeight, this.sprintWidth, this.spriteHeight, segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);       
        });
        context.textAlign = 'left';
        context.fillStyle = 'black';
        context.font = '30px Ariel';
        context.fillText('Score: ' + this.score, 20, 20);
    },
    update(){
        // helps to move the snake
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // will remove/add segments
        this.segments.unshift({x: this.position.x, y: this.position.y, frameX: 0, frameY: 0});
        if (this.segments.length > this.length){
            this.segments.pop();
        }

        if( // wall collision check
            this.position.x < 0 ||
            this.position.x > COLUMNS - 1 ||
            this.position.y < 0 ||
            this.position.y > ROWS - 1 ||
            this.score < 0
        ){
            GAME.gameOver = true;
        }

        if(this.position.x == Food.x && this.position.y == Food.y){ // Score update check
            this.length++;
            this.score++;
            Food.reset();
        }

        this.segments.forEach((segment, i) => { // eating own tail check
            if (i > 0 && (segment.x == this.position.x && segment.y == this.position.y)){
                this.segments.length = i + 1;
                this.score -= 5;
                this.length = this.segments.length;
            }
        });
    },
    reset(){
        this.score = 0;
        this.length = 4;
        this.segments = [];
        this.position = {x: 0, y: Math.floor(ROWS/2)};
        this.velocity = {x: 1, y: 0};
    },
    moveUp(){
        if(this.velocity.y == 0){
            this.velocity.x = 0;
            this.velocity.y = -1;
        }
    },
    moveDown(){
        if(this.velocity.y == 0){
            this.velocity.x = 0;
            this.velocity.y = 1;
        }
    },
    moveLeft(){
        if(this.velocity.x == 0){
            this.velocity.x = -1;
            this.velocity.y = 0;
        }
    },
    moveRight(){
        if(this.velocity.x == 0){
            this.velocity.x = 1;
            this.velocity.y = 0;
        }
    },
    setSprintFrame(index){
        const segment = this.segments[index];
        const nextSegment = this.segments[index + 1] || 0;
        const prevSegment = this.segments[index - 1] || 0;

        if(index == 0){ // head movements
            if(nextSegment.y > segment.y){ // going up
                segment.frameX = 1;
                segment.frameY = 2;
            }else if(nextSegment.y < segment.y){ // going down
                segment.frameX = 0;
                segment.frameY = 4;
            }else if(nextSegment.x > segment.x){ // going left
                segment.frameX = 0;
                segment.frameY = 0;
            }else if(nextSegment.x < segment.x){ // going rigth
                segment.frameX = 2;
                segment.frameY = 1;
            }
        }else if(index == this.segments.length - 1){ // tail movments
            if(prevSegment.y < segment.y){
                segment.frameX = 1;
                segment.frameY = 4;
            }else if(prevSegment.y > segment.y){
                segment.frameX = 0;
                segment.frameY = 2;
            }else if(prevSegment.x < segment.x){
                segment.frameX = 2;
                segment.frameY = 0;
            }else if(prevSegment.x > segment.x){
                segment.frameX = 0;
                segment.frameY = 1;
            }
        }
        else { // body movements
            if(nextSegment.x > segment.x && prevSegment.x){
                segment.frameX = 1;
                segment.frameY = 1;
            }else if(nextSegment.x < segment.x && prevSegment.x){
                segment.frameX = 1;
                segment.frameY = 0;
            }else if(nextSegment.y > segment.y && prevSegment.y){
                segment.frameX = 1;
                segment.frameY = 3;
            }else if(nextSegment.y < segment.y && prevSegment.y){
                segment.frameX = 0;
                segment.frameY = 3;
            }
            // body bending.
            else if(nextSegment.x < segment.x && prevSegment.y > segment.y){
                segment.frameX = 3;
                segment.frameY = 2;
            }else if(nextSegment.y < segment.y && prevSegment.x < segment.x){
                segment.frameX = 3;
                segment.frameY = 3;
            }else if(nextSegment.x > segment.x && prevSegment.y < segment.y){
                segment.frameX = 2;
                segment.frameY = 3;
            }else if(nextSegment.y > segment.y && prevSegment.x > segment.x){
                segment.frameX = 2;
                segment.frameY = 2;
            }else{
                segment.frameX = 6;
                segment.frameY = 0;
            }
        }
    }
}