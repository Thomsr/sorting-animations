import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

export default defineConfig({
  plugins: [motionCanvas({
    project: [
      './src/project.ts',
      './src/shellsort.ts',
      './src/insertion-vs-bubble.ts'
    ]
  })],
});
