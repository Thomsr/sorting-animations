import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import path from "path";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/project/vs-template.ts',
        './src/project/short-template.ts',
        './src/project/project.ts',
        './src/project/shellsort.ts',
        './src/project/insertion-vs-bubble.ts',
        './src/project/test.ts',
        './src/project/selectionsort.ts'
      ]
    })
  ],
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src'),
    }
  }
});
