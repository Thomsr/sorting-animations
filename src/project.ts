import {makeProject} from '@motion-canvas/core/lib';

import intro from '../src/scenes/intro?scene'
import introMerge from './scenes/mergesort/introMerge?scene'
import example from './scenes/mergesort/example?scene';
import voice from '../audio/mergeVoice.mp4'

export default makeProject({
  scenes: [
    intro, 
    introMerge,
    example
  ],
  background: '#141414',
  audio: voice,
});
