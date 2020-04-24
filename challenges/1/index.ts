import { ProgressLoader } from "./src/progress-loader";

const loaderElementList = Array.from(document.querySelectorAll < HTMLElement > ('.progress-loader'));
const loaderList = loaderElementList.map(element => new ProgressLoader(element));
const finishedIdxList = new Set();

const handle = setInterval(() => {
   if (finishedIdxList.size === loaderList.length) {
       clearInterval(handle);
       return;
   }

   let randomIdx;
   do {
       randomIdx = Math.floor(Math.random() * loaderList.length)
   } while (finishedIdxList.has(randomIdx));

   const loader = loaderList[randomIdx];

   if (loader.isDone) {
       finishedIdxList.add(randomIdx);
   } else {
       loader.progress += 10;
   }
}, 300 * Math.random());