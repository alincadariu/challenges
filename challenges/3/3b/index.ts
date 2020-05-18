import { generateMatrix } from '../../2/src/generateMatrice';
import { Matrix, MatrixClickEvent } from './src/Matrix';
import { randomInt, randomColor } from '../helpers';

let COLUMNS: number;
let ROWS: number;

function draw() {
    COLUMNS = randomInt(1, 11);
    ROWS = randomInt(1, 31);
    const color = randomColor();
    const matrix = generateMatrix(ROWS, COLUMNS);
    function onClick(ev: MatrixClickEvent) { console.log(ev); }
    const renderer = new Matrix({
        matrix,
        color,
        onClick,
    });
    document.body.innerHTML = '';
    document.body.appendChild(renderer.canvasElement);
}
draw();
//const handle = setInterval(draw, 6000);


