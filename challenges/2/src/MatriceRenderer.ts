const BOX_STYLE = `width: 50px;
    height: 50px;`;

const BOX_WRAPPER_STYLE = `height: 200px;
    display:grid;
    margin: auto;`;

export class MatriceRenderer {

    private _box:HTMLDivElement = document.createElement('div');
    private _boxWrapper:HTMLDivElement = document.createElement('div');
    private _matrice: number[][];
    private _numberOfColumns: number;

    constructor(matrice: number[][]){
        this._matrice = matrice;
        this._numberOfColumns = matrice[0].length;
    }

    set render(color: string) {
        
        this._boxWrapper.setAttribute('style', BOX_WRAPPER_STYLE);
        this._boxWrapper.style.setProperty('grid-template-columns', `repeat(${this._numberOfColumns}, 50px)`)
        document.body.appendChild(this._boxWrapper);

        this._matrice.forEach((row, indexRow) => { 
            row.forEach((column, indexCol) => {
                this._box = document.createElement('div');
                this._box.setAttribute('style', BOX_STYLE);
                column === 1 ? this._box.style.setProperty('background-color', color): this._box.style.setProperty('background-color', 'white');
                this._boxWrapper.appendChild(this._box);
                this._box.onclick = function(event) {  
                    console.log(`x: ${indexCol}, y: ${indexRow}`);
                };
            })
        });
    }
}