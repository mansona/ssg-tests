import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  build: {
    ssr: process.env.BUILD_SSR ? 'app/app.js' : false,
    outDir: process.env.BUILD_SSR ? 'dist-ssr' : 'dist',
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
