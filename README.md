# challenges

## challenge #1

Let's have some fun with progress bars! 😁

Given the following markup:

``` html
<div class="progress-loader" data-progress="10" data-color="#e67e22"></div>
<div class="progress-loader" data-progress="20"></div>
<div class="progress-loader"></div>
<div class="progress-loader" data-progress="50"></div>
<div class="progress-loader" data-progress="70" data-color="rgb(41,128,185)"></div>
```

``` json
 {
     "class": {
         "required": true,
         "description": "The class that signals our library that this element is a progress loader."
     },
     "data-progress": {
         "requried": false,
         "defaultValue": 0,
         "descriptions": "The data attribue that will hold the current value displayed by the progress bar"
     },
     "data-color": {
        "required": false,
        "defaultValue": "rgb(46,204,113)",
        "description": "The color of the progress bar fill"
     }
 }
```

This code should run untill all the loaders reach `100%` 🥱😴🥱:
``` javascript
    const loaderElementList = document.querySelectorAll('.progress-loader');
    const loaderList = loaders.map(element => new ProgressLoader(element));
    const doneLoaderIdxList = [];

    const handle = setInterval(() => {
        if (doneLoaderIdxList.length === loaderList.length) {
            clearInterval(handle);
        }

        const randomIdx = Math.floor(Math.random() * loaderList.length);
        const loader = loaderList[randomIdx];

        if (loader.isDone) {
            doneLoaderIdxList.push(idx);
        } else {
            loader.progress = loader.progress += 10;
        }
    }, 5000 * Math.random());
```

And here's a small layout of our expected API 😎:
``` typescript
    // Progress API
    declare class ProgressLoader {
        constructor(element: HTMLElement);
        get isDone: boolean;
        get progress(): number;
        set progress(value: number): void;
    }
```

Expected visual appearance:

![](resources/challenge-1-mock.png)
