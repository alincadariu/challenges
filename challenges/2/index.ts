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

const logCellPosition = (ev: MouseEvent) => {
    const element = ev.target as HTMLElement;
    if (!element.classList.contains('matrix-cell')) { return; }

    const x = parseInt(element.dataset['col']);
    const y = parseInt(element.dataset['row']);

    console.log({ x, y });
};

document.addEventListener('click', logCellPosition);

const drawMatrix = () => {
    document.body.innerHTML = '';

    const color = randomRgba();
    const matrix = generateMatrix(ROWS, COLUMNS);

    const renderer = new MatrixRenderer({
        matrix,
        color,
    });

    document.body.appendChild(renderer.matrixElement);
};

drawMatrix();

setInterval(drawMatrix, 5000);
