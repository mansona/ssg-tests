import { readFile, writeFile, mkdir } from 'node:fs/promises';
import SimpleDOM from 'simple-dom/dist/commonjs/es5/index.js';
import { join } from 'path';

import Module from "node:module";

const require = Module.createRequire(import.meta.url);

global.FastBoot = {
  require(thing) {
    require(thing)
  }
}

import Result from './result.mjs';

const { default: App } = await import('./dist-ssr/app.mjs');
const wrapperHTML = await readFile('./dist/index.html', 'utf8');

async function preRender(path) {
  const result = await render(path, App);

  result._finalizeHTML();
  await mkdir(join('dist', path), { recursive: true });
  await writeFile(join('dist', path, 'index.html'), await result.html());
}


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
  return new Result(bootOptions.document, wrapperHTML, {})
}

const routesToPrerender = ['/', '/face'];

for (const route of routesToPrerender) {
  await preRender(route);
}
