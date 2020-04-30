import { generateMatrice } from './src/generateMatrice';
import { MatriceRenderer } from './src/MatriceRenderer';

let COLUMNS: number;
let ROWS: number;

document.body.addEventListener('click', ev => {
    if (!(ev.target instanceof HTMLElement)) return;

    const isCell = ev.target.dataset['column'] != null && ev.target.dataset['row'] != null;
    if (!isCell) return;

    console.log({
        x: ev.target.dataset['column'],
        y: ev.target.dataset['row']
    });
})

function render() {

    document.body.innerHTML = '';
    COLUMNS = Math.floor(Math.random() * 10 + 1);
    ROWS = Math.floor(Math.random() * 30 + 1);
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const matrice = generateMatrice(ROWS, COLUMNS);
    const renderer = new MatriceRenderer(matrice);
    renderer.render = randomColor;

}


render();

//const handle = setInterval(render, 6000);


