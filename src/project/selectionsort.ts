import {makeProject} from '@motion-canvas/core/lib';

import intro from '../scenes/intro?scene'
import example from '../scenes/selectionsort/example?scene';

export default makeProject({
  scenes: [
    intro,
    example,
],
  background: '#141414',
});
