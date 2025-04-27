let playeroneColor = 'red';
let playertwoColor = 'yellow';
let p2wincolor = 'rgba(155, 155, 0)';
let p1wincolor = 'rgba(155, 0, 0)';
const winMusic = new Audio('music/wingame.wav');
const putMusic = new Audio('music/put.wav');
const music = new Audio('music/backdround.mp3');

music.volume = 0.3;
music.muted = false;
music.loop = true;
music.play();
putMusic.volume = 0.5;
putMusic.muted = false;
putMusic.loop = false;


winMusic.volume = 0.5;
winMusic.muted = false;
winMusic.loop = false;
let p1counter = 0;
let p2counter = 0;
let main = document.querySelector('.mainn');
let playerturn = playeroneColor;
const overlay = document.querySelector('.ov');
const startbutton = document.querySelector('.start');
let text1 = document.querySelector('.first');
let text2 = document.querySelector('.second');
let text3 = document.querySelector('.third');
let restartbutton = document.querySelector('.res');
restartbutton.addEventListener('click', () => {
    restartGame();
    overlay.style.display = 'none';
});

startbutton.addEventListener('click', () => {
    startbutton.style.display = 'none';
    main.style.opacity = '1';
});

function updateBeforeStyle(columnClass, color) {
    const styleSheet = document.styleSheets[0];
    const ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule =>
        rule.selectorText === `.${columnClass}::before`
    );


    styleSheet.insertRule(
        `.${columnClass}::before { 
                background-color: ${color} !important; 
                 !important; 
            }`,
        styleSheet.cssRules.length
    );

}
const coloumns = document.querySelectorAll('.col');

const allCells = Array.from(coloumns).map(col => Array.from(col.querySelectorAll('.cell')));





coloumns.forEach(col => {
    col.addEventListener('click', () => {
        putMusic.play();
        putMusic.currentTime = 0;
        const cells = col.querySelectorAll('.cell');
        for (let i = cells.length - 1; i >= 0; i--) {
            // cells[i].classList.add('btn');
            if (cells[i].classList.contains('false')) {
                cells[i].classList.remove('false');
                cells[i].style.backgroundColor = playerturn;

                cells[i].classList.add('falling');

                cells[i].addEventListener('animationend', () => {
                    cells[i].classList.remove('falling');
                });


                chekeWin();
                if (playerturn === playeroneColor) {
                    playerturn = playertwoColor;
                    updateBeforeStyle('col1', playertwoColor);
                    updateBeforeStyle('col2', playertwoColor);
                    updateBeforeStyle('col3', playertwoColor);
                    updateBeforeStyle('col4', playertwoColor);
                    updateBeforeStyle('col5', playertwoColor);
                    updateBeforeStyle('col6', playertwoColor);
                    updateBeforeStyle('col7', playertwoColor);
                }
                else {
                    playerturn = playeroneColor;
                    updateBeforeStyle('col1', playeroneColor);
                    updateBeforeStyle('col2', playeroneColor);
                    updateBeforeStyle('col3', playeroneColor);
                    updateBeforeStyle('col4', playeroneColor);
                    updateBeforeStyle('col5', playeroneColor);
                    updateBeforeStyle('col6', playeroneColor);
                    updateBeforeStyle('col7', playeroneColor);
                }
                break;
            }

        }
    });
});

function chekeWin() {
    // col by col
    for (let i = 0; i < allCells.length; i++) {
        const cells = allCells[i];
        for (let j = 0; j < cells.length - 3; j++) {
            if (
                cells[j].style.backgroundColor === playerturn &&
                cells[j + 1].style.backgroundColor === playerturn &&
                cells[j + 2].style.backgroundColor === playerturn &&
                cells[j + 3].style.backgroundColor === playerturn
            ) {
               
                cells[j].classList.add('btn');
                cells[j + 1].classList.add('btn');
                cells[j + 2].classList.add('btn');
                cells[j + 3].classList.add('btn');
                if (playerturn === playeroneColor) {
                    cells[j].style.backgroundColor = p1wincolor;
                    cells[j + 1].style.backgroundColor = p1wincolor;
                    cells[j + 2].style.backgroundColor = p1wincolor;
                    cells[j + 3].style.backgroundColor = p1wincolor;



                    playerturn = playertwoColor;
                }
                else {
                    playerturn = playeroneColor;
                    cells[j].style.backgroundColor = p2wincolor;
                    cells[j + 1].style.backgroundColor = p2wincolor;
                    cells[j + 2].style.backgroundColor = p2wincolor;
                    cells[j + 3].style.backgroundColor = p2wincolor;
                }
                setTimeout(() => {
                    winMusic.play();
                    coloumns.forEach(col => {
                        col.removeEventListener('click', () => { });
                    });
                    if (playerturn === playeroneColor) {
                        p1counter++;
                    }
                    else {
                        p2counter++;
                    }
                    main.style.opacity = '0.2';
                    text1.textContent = `${playerturn} wins!`;
                    text2.textContent = `${playeroneColor} : ${p1counter}`
                    text3.textContent = `${playertwoColor} : ${p2counter}`
                    overlay.style.display = 'flex';
                    return;
                }, 2000);
            }
        }
    }
    // row by row
    for (let i = 0; i < allCells[0].length; i++) {
        for (let j = 0; j < allCells.length - 3; j++) {
            if (
                allCells[j][i].style.backgroundColor === playerturn &&
                allCells[j + 1][i].style.backgroundColor === playerturn &&
                allCells[j + 2][i].style.backgroundColor === playerturn &&
                allCells[j + 3][i].style.backgroundColor === playerturn
            ) {
                
                allCells[j][i].classList.add('btn');
                allCells[j + 1][i].classList.add('btn');
                allCells[j + 2][i].classList.add('btn');
                allCells[j + 3][i].classList.add('btn');
                if (playerturn === playeroneColor) {
                    allCells[j][i].style.backgroundColor = p1wincolor;
                    allCells[j + 1][i].style.backgroundColor = p1wincolor;
                    allCells[j + 2][i].style.backgroundColor = p1wincolor;
                    allCells[j + 3][i].style.backgroundColor = p1wincolor;
                    
                    
                    
                    playerturn = playertwoColor;
                }
                else {
                    playerturn = playeroneColor;
                    allCells[j][i].style.backgroundColor = p2wincolor;
                    allCells[j + 1][i].style.backgroundColor = p2wincolor;
                    allCells[j + 2][i].style.backgroundColor = p2wincolor;
                    allCells[j + 3][i].style.backgroundColor = p2wincolor;
                }
                setTimeout(() => {
                    
                    winMusic.play();
                    
                    if (playerturn === playeroneColor) {
                        p1counter++;
                    }
                    else {
                        p2counter++;
                    }
                    main.style.opacity = '0.2';
                    text1.textContent = `${playerturn} wins!`;
                    text2.textContent = `${playeroneColor} : ${p1counter}`
                    text3.textContent = `${playertwoColor} : ${p2counter}`
                    overlay.style.display = 'flex';
                    return;
                }, 2000);
            }
        }
    }
    // diagonal by diagonal
    for (let i = 0; i < allCells.length - 3; i++) {
        for (let j = 0; j < allCells[i].length - 3; j++) {
            if (
                allCells[i][j].style.backgroundColor === playerturn &&
                allCells[i + 1][j + 1].style.backgroundColor === playerturn &&
                allCells[i + 2][j + 2].style.backgroundColor === playerturn &&
                allCells[i + 3][j + 3].style.backgroundColor === playerturn
            ) {
                
                allCells[i][j].classList.add('btn');
                allCells[i + 1][j + 1].classList.add('btn');
                allCells[i + 2][j + 2].classList.add('btn');
                allCells[i + 3][j + 3].classList.add('btn');
                if (playerturn === playeroneColor) {
                    allCells[i][j].style.backgroundColor = p1wincolor;
                    allCells[i + 1][j + 1].style.backgroundColor = p1wincolor;
                    allCells[i + 2][j + 2].style.backgroundColor = p1wincolor;
                    allCells[i + 3][j + 3].style.backgroundColor = p1wincolor;
                    

                    
                    playerturn = playertwoColor;
                }
                else {
                    playerturn = playeroneColor;
                    allCells[i][j].style.backgroundColor = p2wincolor;
                    allCells[i + 1][j + 1].style.backgroundColor = p2wincolor;
                    allCells[i + 2][j + 2].style.backgroundColor = p2wincolor;
                    allCells[i + 3][j + 3].style.backgroundColor = p2wincolor;
                }
                setTimeout(() => {

                    winMusic.play();
                    
                    if (playerturn === playeroneColor) {
                        p1counter++;
                    }
                    else {
                        p2counter++;
                    }
                    main.style.opacity = '0.2';
                    text1.textContent = `${playerturn} wins!`;
                    text2.textContent = `${playeroneColor} : ${p1counter}`
                    text3.textContent = `${playertwoColor} : ${p2counter}`
                    overlay.style.display = 'flex';
                    return;
                }, 2000);
            }
        }
    }

    for (let i = 3; i < allCells.length; i++) {
        for (let j = 0; j < allCells[i].length - 3; j++) {
            if (
                allCells[i][j].style.backgroundColor === playerturn &&
                allCells[i - 1][j + 1].style.backgroundColor === playerturn &&
                allCells[i - 2][j + 2].style.backgroundColor === playerturn &&
                allCells[i - 3][j + 3].style.backgroundColor === playerturn
            ) {
                
                allCells[i][j].classList.add('btn');
                allCells[i - 1][j + 1].classList.add('btn');
                allCells[i - 2][j + 2].classList.add('btn');
                allCells[i - 3][j + 3].classList.add('btn');
                if (playerturn === playeroneColor) {
                    allCells[i][j].style.backgroundColor = p1wincolor;
                    allCells[i - 1][j + 1].style.backgroundColor = p1wincolor;
                    allCells[i - 2][j + 2].style.backgroundColor = p1wincolor;
                    allCells[i - 3][j + 3].style.backgroundColor = p1wincolor;



                    playerturn = playertwoColor;
                }
                else {
                    playerturn = playeroneColor;
                    allCells[i][j].style.backgroundColor = p2wincolor;
                    allCells[i - 1][j + 1].style.backgroundColor = p2wincolor;
                    allCells[i - 2][j + 2].style.backgroundColor = p2wincolor;
                    allCells[i - 3][j + 3].style.backgroundColor = p2wincolor;
                }
                setTimeout(() => {
                    winMusic.play();


                    if (playerturn === playeroneColor) {
                        p1counter++;
                    }
                    else {
                        p2counter++;
                    }
                    main.style.opacity = '0.2';
                    text1.textContent = `${playerturn} wins!`;
                    text2.textContent = `${playeroneColor} : ${p1counter}`
                    text3.textContent = `${playertwoColor} : ${p2counter}`
                    overlay.style.display = 'flex';
                    return;
                }, 2000);
            }
        }
    }
    // check for draw
    let draw = true;
    allCells.forEach(cells => {
        cells.forEach(cell => {
            if (cell.classList.contains('false')) {
                draw = false;
            }
        });
    });
    if (draw) {
        setTimeout(() => {
            winMusic.play();


            if (playerturn === playeroneColor) {
                p1counter++;
            }
            else {
                p2counter++;
            }
            main.style.opacity = '0.2';
            text1.textContent = `its a draw!`;
            text2.textContent = `${playeroneColor} : ${p1counter}`
            text3.textContent = `${playertwoColor} : ${p2counter}`
            overlay.style.display = 'flex';
            return;
        }, 1000);
    }
}
function restartGame() {
    main.style.opacity = '1';
    allCells.forEach(cells => {
        cells.forEach(cell => {
            cell.classList.add('false');
            cell.style.backgroundColor = 'white';
        });
    });
    playerturn = playeroneColor;
    updateBeforeStyle('col1', playeroneColor);
    updateBeforeStyle('col2', playeroneColor);
    updateBeforeStyle('col3', playeroneColor);
    updateBeforeStyle('col4', playeroneColor);
    updateBeforeStyle('col5', playeroneColor);
    updateBeforeStyle('col6', playeroneColor);
    updateBeforeStyle('col7', playeroneColor);
}
