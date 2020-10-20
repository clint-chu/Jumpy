document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');

    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper')
    };

    createJumper();
});