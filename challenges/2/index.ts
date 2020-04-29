import { generateMatrice } from './src/generateMatrice';
import { MatriceRenderer } from './src/MatriceRenderer';

const COLUMNS: number = 5;
const ROWS: number = 6;

const handle = setInterval(function() {

    while(document.body.lastChild) { 
        document.body.removeChild(document.body.lastChild); 
    }

    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const matrice = generateMatrice(ROWS, COLUMNS);
    const renderer = new MatriceRenderer(matrice);
    renderer.render = randomColor;
    
}, 6000);

