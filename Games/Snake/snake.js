const Snake = {
    position: {x: 0, y: Math.floor(ROWS/2)},
    velocity: {x: 1, y: 0},
    length: 3,
    segments: [],
    score: 0,
    image: document.getElementById('snake_model'),
    sprintWidth: 200,
    spriteHeight: 200,
    readyToMove: true,
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
        this.readyToMove = true;
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
        this.length = 3;
        this.segments = [];
        this.position = {x: 0, y: Math.floor(ROWS/2)};
        this.velocity = {x: 1, y: 0};
        for(let i = 0; i < this.length; i++)
        {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.segments.unshift({x: this.position.x, y: this.position.y, frameX: 0, frameY: 0});
        }
    },
    moveUp(){
        if(this.velocity.y == 0 && this.readyToMove){
            this.velocity.x = 0;
            this.velocity.y = -1;
            this.readyToMove = false;
        }
    },
    moveDown(){
        if(this.velocity.y == 0 && this.readyToMove){
            this.velocity.x = 0;
            this.velocity.y = 1;
            this.readyToMove = false;
        }
    },
    moveLeft(){
        if(this.velocity.x == 0 && this.readyToMove){
            this.velocity.x = -1;
            this.velocity.y = 0;
            this.readyToMove = false;
        }
    },
    moveRight(){
        if(this.velocity.x == 0 && this.readyToMove){
            this.velocity.x = 1;
            this.velocity.y = 0;
            this.readyToMove = false;
        }
    },
    setSprintFrame(index){
        const segment = this.segments[index];
        const nextSegment = this.segments[index + 1] || 0;
        const prevSegment = this.segments[index - 1] || 0;

        // rendering head

        if(index == 0){
            if(segment.y < nextSegment.y)
            {
                if(Food.y == segment.y - 1 && Food.x == segment.x )
                {
                    segment.frameX = 7;
                    segment.frameY = 1;
                }
                else
                {
                    segment.frameX = 1;
                    segment.frameY = 2;
                }
            }
            else if(segment.y > nextSegment.y)
            {
                if(Food.y == segment.y + 1 && Food.x == segment.x)
                {
                    segment.frameX = 7;
                    segment.frameY = 3;
                }
                else
                {
                    segment.frameX = 0;
                    segment.frameY = 4;
                }
            }
            else if(segment.x < nextSegment.x)
            {
                if(Food.x == segment.x - 1 && Food.y == segment.y)
                {
                    segment.frameX = 2;
                    segment.frameY = 4;
                }
                else
                {
                    segment.frameX = 0;
                    segment.frameY = 0;
                }
            }
            else if(segment.x > nextSegment.x)
            {
                if(Food.x == segment.x + 1 && Food.y == segment.y)
                {
                    segment.frameX = 4;
                    segment.frameY = 4;
                }
                else
                {
                    segment.frameX = 2;
                    segment.frameY = 1;
                }
            }
        }

        // rendering tail

        else if(index == this.segments.length - 1){
            if(prevSegment.y < segment.y)
            {
                segment.frameX = 1;
                segment.frameY = 4;
            }
            else if(prevSegment.y > segment.y)
            {
                segment.frameX = 0;
                segment.frameY = 2;
            }
            else if(prevSegment.x > segment.x)
            {
                segment.frameX = 0;
                segment.frameY = 1;
            }
            else if(prevSegment.x < segment.x)
            {
                segment.frameX = 2;
                segment.frameY = 0;
            }
        }

        // rendering whole body

        else{  
            if (nextSegment.x < segment.x && prevSegment.x > segment.x) {
                segment.frameX = 1;
                segment.frameY = 1;
            }
            else if (nextSegment.x > segment.x && prevSegment.x < segment.x) {
                segment.frameX = 1;
                segment.frameY = 0;
            }
            else if (nextSegment.y > segment.y && prevSegment.y < segment.y) {
                segment.frameX = 1;
                segment.frameY = 3;
            }
            else if (nextSegment.y < segment.y && prevSegment.y > segment.y) {
                segment.frameX = 0;
                segment.frameY = 3;
            }

            // bending counter clockwise

            else if(prevSegment.x < segment.x && nextSegment.y > segment.y)
            {
                segment.frameX = 4;
                segment.frameY = 0;
            }
            else if(prevSegment.y > segment.y && nextSegment.x > segment.x)
            {
                segment.frameX = 3;
                segment.frameY = 0;
            }
            else if(prevSegment.x > segment.x && nextSegment.y < segment.y)
            {
                segment.frameX = 3;
                segment.frameY = 1;
            }
            else if(prevSegment.y < segment.y && nextSegment.x < segment.x)
            {
                segment.frameX = 4;
                segment.frameY = 1;
            }

            // bending clockwise

            else if(nextSegment.y > segment.y && prevSegment.x > segment.x)
            {
                segment.frameX = 2;
                segment.frameY = 2;
            }
            else if(nextSegment.x < segment.x && prevSegment.y > segment.y)
            {
                segment.frameX = 3;
                segment.frameY = 2;
            }
            else if(nextSegment.y < segment.y && prevSegment.x < segment.x)
            {
                segment.frameX = 3;
                segment.frameY = 3;
            }
            else if(nextSegment.x > segment.x && prevSegment.y < segment.y)
            {
                segment.frameX = 2;
                segment.frameY = 3;
            }

        }
    }
}