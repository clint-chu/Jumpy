document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');
    let jumperLeft = 50;
    let jumperBottom = 150;
    let isGameOver = false;

    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper');
        jumper.style.left = jumperLeft + 'px';
        jumper.style.bottom = jumperBottom + 'px';
    };

    function createPlatform() {
        
    };

    function start() {
        if (!isGameOver) {
            createJumper();
            createPlatforms();
        };
    };

    start();

});