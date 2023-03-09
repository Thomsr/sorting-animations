import {makeProject} from '@motion-canvas/core/';

import scene from '../scenes/vs-template/vs-template?scene';
import coddy from '../scenes/advertisements/coddy?scene'

export default makeProject({
  scenes: [
    scene,
    coddy,
],
});
