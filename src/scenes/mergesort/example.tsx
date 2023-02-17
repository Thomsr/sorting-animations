import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, loop, sequence, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Color, Direction, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef, makeRef, range, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../../styles/styles';
import { Array } from '../../components/ArrayComponent/Array';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Rect, Text } from '@motion-canvas/2d/lib/components';
import { slideTransition } from '@motion-canvas/core/lib/transitions' 


export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Top, 1)

  const Example1 = createRef<Text>();
  const textStyle = {
    paddingTop: 10,
    fontFamily: 'JetBrains Mono',
    fill: 'rgba(255, 255, 255, 0.6)',
  };

  view.add(
    <Text
        ref={Example1}
        text={"EXAMPLE 1"}
        opacity={0}
        fontSize={100}
        lineHeight={100}
        {...textStyle}
    />
  ) 

  yield* Example1().opacity(1, .5)
  yield* waitFor(.7);
  yield* Example1().opacity(0, .5)

  const ArrayVal = [7, 5, 6, 8, 2];
  const boxGap = 36;
  const boxWidth = 128;
  const box = boxGap + boxWidth;

  const ArrayRef = createRef<Array>();
  const OutlineRef: Rect[] = [];

  view.add(
    <>
      <Array
        ref={ArrayRef}
        values={ArrayVal}
        boxGap={boxGap}
      />
      <Rect
        ref={makeRef(OutlineRef, 0)}
        x={-(ArrayVal.length/2) * (box) + ArrayVal.length * ((box) / 2)}
        height={168}
        width={ArrayVal.length * (box)}
        stroke={Colors.surface}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
    </>
  )

  for(let i = 0; i < ArrayVal.length; i++){
    ArrayRef().boxArray[i].opacity(0);
  }

  yield* sequence(
    0.1,
    ...ArrayRef().children().map(box => box.opacity(1, .3)),
  )

  yield* waitUntil("Split1");

  yield* waitFor(5);
});

function* newOutline(outlineRef: Rect[], size: number, Nodes: Rect[]){
  
}
