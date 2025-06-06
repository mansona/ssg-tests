import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        'app.js': 'app/app.js',
        'index.html': 'index.html'
      }
    },
    emitAssets: true,
    minify: false,
  },
  ssr: {
    noExternal: true,
  },

  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
