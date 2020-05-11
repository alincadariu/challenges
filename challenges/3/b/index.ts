import { generateMatrix } from './src/generateMatrix';
import { MatrixRenderer } from './src/MatrixRenderer';

const random = ({ min, max }) => Math.floor(Math.random() * max) + min;
const randomRgba = () => `rgba(${
    random({ min: 0, max: 255 })
    }, ${
    random({ min: 0, max: 255 })
    }, ${
    random({ min: 0, max: 255 })
    })`;

const COLUMNS: number = random({ min: 5, max: 10 });
const ROWS: number = random({ min: 10, max: 15 });

const color = randomRgba();
const matrix = generateMatrix(ROWS, COLUMNS);
const renderer = new MatrixRenderer({
    matrix,
    color,
});

renderer.matrixElement.addEventListener('cellClick', (ev) => console.log(ev.detail));

document.body.appendChild(renderer.matrixElement);

const drawMatrix = () => {
    const color = randomRgba();
    const matrix = generateMatrix(ROWS, COLUMNS);
    renderer.color = color;
    renderer.matrix = matrix;
    renderer.update();
};

drawMatrix();

setInterval(drawMatrix, 10000);
