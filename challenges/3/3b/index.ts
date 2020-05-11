import { generateMatrix } from '../../2/src/generateMatrice';
import { Matrix, MatrixClickEvent } from './src/Matrix';

let COLUMNS: number;
let ROWS: number;

function draw() {
    COLUMNS = Math.floor(Math.random() * 10 + 1);
    ROWS = Math.floor(Math.random() * 30 + 1);
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const matrix = generateMatrix(ROWS, COLUMNS);
    function onClick(ev: MatrixClickEvent) { console.log(ev); }
    const renderer = new Matrix({
        matrix,
        color,
        onClick,
    });
    document.body.innerHTML = '';
    document.body.appendChild(renderer.matrixContainer);
}
draw();
const handle = setInterval(draw, 6000);


