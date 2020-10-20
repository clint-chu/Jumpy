document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');
    let jumperLeft = 50;
    let jumperBottom = 150;
    let platformCount = 5;
    let platforms = [];
    let isGameOver = false;

    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper');
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

    function start() {
        if (!isGameOver) {
            createJumper();
            createPlatforms();
        };
    };

    start();

});