import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import SimpleDOM from 'simple-dom/dist/commonjs/es5/index.js';

const { default: App } = await import('./dist/app.js.mjs');
const HTMLSerializer = new SimpleDOM.HTMLSerializer(SimpleDOM.voidMap);
const wrapperHTML = await readFile('./dist/index.html', 'utf8');

const appHtml = await render('/', App);


const outputHTML = wrapperHTML.replace('<body>', `<body>${appHtml}`);

await writeFile('dist/index.html', outputHTML);


function buildBootOptions() {
  let doc = new SimpleDOM.Document();
  let rootElement = doc.body;
  return {
    isBrowser: false,
    document: doc,
    rootElement,
    shouldRender: true,
  };
}

async function render(url, App) {
  let instance = App.create({
    autoboot: false,
    modulePrefix: 'ssg-tests',
  });
  let bootOptions = buildBootOptions();
  await instance.visit(url, bootOptions);
  let html = await HTMLSerializer.serializeChildren(bootOptions.document.body);
  return html;
}


//  for (const url of routesToPrerender) {
//     const [appHtml, preloadLinks] = await render(url, manifest)

//     const html = template
//       .replace(`<!--preload-links-->`, preloadLinks)
//       .replace(`<!--app-html-->`, appHtml)

//     const filePath = `dist/static${url === '/' ? '/index' : url}.html`
//     fs.writeFileSync(toAbsolute(filePath), html)
//     console.log('pre-rendered:', filePath)
//   }
