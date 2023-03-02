import {makeProject} from '@motion-canvas/core/lib';

import audio from '../../audio/selectionVoice.mp4'
import intro from '../scenes/intro?scene'
import example from '../scenes/selectionsort/example?scene';
import example2 from '../scenes/selectionsort/example2?scene'
import time from '../scenes/selectionsort/timecomplexity?scene'

export default makeProject({
  scenes: [
    intro,
    example,
    example2,
    time
],
audio: audio,
  background: '#141414',
});
