const BOX_STYLE = `width: 50px;
    height: 50px;
    display: flex;`;

const BOX_WRAPPER_STYLE = `min-height: 300px;
    display:grid;`;

export class MatriceRenderer {

    private _box: HTMLDivElement = document.createElement('div');
    private _boxWrapper: HTMLDivElement = document.createElement('div');
    private _numberOfColumns: number;


    constructor(private _matrice: number[][]) {
        this._numberOfColumns = _matrice[0].length;
    }

    set render(color: string) {
        this._boxWrapper.setAttribute('style', BOX_WRAPPER_STYLE);
        this._boxWrapper.style.setProperty('grid-template-columns', `repeat(${this._numberOfColumns}, 50px)`);
        document.body.appendChild(this._boxWrapper);

        this._matrice.forEach((row, indexRow) => {
            row.forEach((column, indexCol) => {
                this._box = document.createElement('div');
                this._box.setAttribute('style', BOX_STYLE);
                const fill = column === 1 ? color : 'transparent';
                this._box.style.setProperty('background-color', fill);
                this._boxWrapper.appendChild(this._box);
                this._box.dataset['column'] = `${indexCol}`;
                this._box.dataset['row'] = `${indexRow}`;
            })
        });
    }
}