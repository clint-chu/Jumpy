document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');
    let startPoint = 150;
    let jumperLeft = 50;
    let jumperBottom = startPoint;
    let isJumping = true;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId
    let downTimerId
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId
    let rightTimerId

    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper');
        jumperLeft = platforms[0].left
        jumper.style.left = jumperLeft + 'px';
        jumper.style.bottom = jumperBottom + 'px';
    };

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        };
    };

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);

            platforms.push(newPlatform);
        };
    };

    function movePlatforms() {
        if (jumperBottom > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom +  'px';
            });
        };
    };

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;

        upTimerId = setInterval(function () {
            jumperBottom += 20;
            jumper.style.bottom = jumperBottom + 'px';
            if (jumperBottom > startPoint + 200) {
                fall();
            };
        }, 30);
    };

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;

        downTimerId = setInterval(function () {
            jumperBottom -= 5;
            jumper.style.bottom = jumperBottom + 'px';

            if (jumperBottom <= 0) {
                gameOver();
            };

            platforms.forEach(platform => {
                if (
                    (jumperBottom >= platform.bottom) &&
                    (jumperBottom <= platform.bottom + 15) &&
                    ((jumperLeft + 60) >= platform.left) &&
                    (jumper <= (platform.left + 85)) &&
                    (!isJumping)
                    ) {
                        startPoint = jumperBottom;
                        jump();
                };
            });

        }, 30);
    };

    function gameOver() {
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    };

    function control(e) {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        } else if (e.key === "arrowUp") {
            moveStraight();
        };
    };

    function moveLeft() {
        isGoingLeft = true;

        leftTimerId = setInterval(function () {
            if (jumperLeft >= 0) {
                jumperLeft -= 5;
                jumper.style.left = jumperLeft + 'px';
            } else {
                moveRight();
            }
        }, 30);
    };

    function moveRight() {
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if (jumperLeft <= 340) {
                jumperLeft += 5
                jumper.style.left = jumperLeft + 'px';
            } else {
                moveLeft();
            }
        }, 30);
    };

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createJumper();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', control);
        };
    };

    start();

});