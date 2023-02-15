import {makeProject} from '@motion-canvas/core/lib';

import intro from './scenes/shellsort/intro?scene';
import example2 from './scenes/shellsort/2?scene';

export default makeProject({
  scenes: [
    intro,
    example2,
],
  background: '#141414',
});
