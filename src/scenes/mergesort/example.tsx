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
  const boxGap = 28;
  const boxWidth = 128;
  const padding = 8;
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
        x={-(ArrayVal.length/2) * box + ArrayVal.length * (box / 2)}
        height={box + padding}
        width={ArrayVal.length * box + padding}
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
  yield* OutlineRef[0].opacity(1, .5)
  yield OutlineRef[0].position.y(-100, .5)
  for(let i = 0; i < ArrayVal.length; i++){
    yield ArrayRef().children()[i].position.y(ArrayRef().boxArray[i].position.y() - 100, .5)
  }
  yield* waitFor(.5);
  for(let i = 0; i < 3; i++){
    yield ArrayRef().children()[i].position.x(ArrayRef().boxArray[i].position.x() - 24, .5)
    yield ArrayRef().children()[i].position.y(ArrayRef().boxArray[i].position.y() + 200, .5)
  }
  for(let i = 3; i < 5; i++){
    yield ArrayRef().children()[i].position.x(ArrayRef().boxArray[i].position.x() + 24, .5)
    yield ArrayRef().children()[i].position.y(ArrayRef().boxArray[i].position.y() + 200, .5)
  }

  view.add(
    <Rect
        ref={makeRef(OutlineRef, 1)}
        x={-(ArrayVal.length/2) * box + 3 * (box / 2) - 24}
        y={100}
        height={box + padding}
        width={3 * box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  view.add(
    <Rect
        ref={makeRef(OutlineRef, 2)}
        x={(ArrayVal.length/2) * box - 2 * (box / 2) + 24}
        y={100}
        height={box + padding}
        width={2 * box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  yield* waitFor(.5)
  yield* all(
    OutlineRef[1].opacity(1, 1),
    OutlineRef[2].opacity(1, 1)
  )

  yield* waitUntil('756');
  yield* all(
    OutlineRef[1].stroke(Colors.surface, .5),
    OutlineRef[2].stroke(Colors.surface, .5),
  )
  for(let i = 0; i < 3; i++){
    yield ArrayRef().HighLight(i, .7, new Color(Colors.blue))
    yield* waitFor(.2);
  }

  yield* waitUntil('82');
  for(let i = 3; i < 5; i++){
    yield ArrayRef().HighLight(i, .7, new Color(Colors.blue))
    yield* waitFor(.2);
  }

  yield* waitUntil('Split2')
  for(let i = 0; i < 5; i++){
    yield ArrayRef().HighLight(i, .7, new Color(Colors.surface))
  }

  for(let i = 0; i < OutlineRef.length; i++){
    yield OutlineRef[i].position.y(OutlineRef[i].position.y() - 100, .5)
  }


  yield all(
    ArrayRef().boxArray[3].position.y(ArrayRef().boxArray[3].position.y() - 100, .5), 
    ArrayRef().boxArray[4].position.y(ArrayRef().boxArray[4].position.y() - 100, .5), 
  )

  yield all(
    ArrayRef().boxArray[0].position.y(ArrayRef().boxArray[0].position.y() + 100, .5), 
    ArrayRef().boxArray[1].position.y(ArrayRef().boxArray[1].position.y() + 100, .5), 
    ArrayRef().boxArray[2].position.y(ArrayRef().boxArray[2].position.y() + 100, .5),
    ArrayRef().boxArray[0].position.x(ArrayRef().boxArray[0].position.x() - 24, .5), 
    ArrayRef().boxArray[1].position.x(ArrayRef().boxArray[1].position.x() - 24, .5), 
    ArrayRef().boxArray[2].position.x(ArrayRef().boxArray[2].position.x() + 24, .5),  
  )

  view.add(
    <Rect
        ref={makeRef(OutlineRef, 3)}
        x={-(ArrayVal.length/2) * box + 2 * (box / 2) - 48}
        y={200}
        height={box + padding}
        width={2 * box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  view.add(
    <Rect
        ref={makeRef(OutlineRef, 4)}
        // x={(ArrayVal.length/2) * box - 2 * (box / 2) + 24}
        y={200}
        height={box + padding}
        width={box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  yield* all(
    OutlineRef[3].opacity(1, 1),
    OutlineRef[4].opacity(1, 1)
  )

  yield* waitUntil('75');
  yield* all(
    OutlineRef[3].stroke(Colors.surface, .5),
    OutlineRef[4].stroke(Colors.surface, .5),
  )
  for(let i = 0; i < 2; i++){
    yield ArrayRef().HighLight(i, .5, new Color(Colors.blue))
    yield* waitFor(.7);
  }

  yield* waitUntil('6');
  yield* ArrayRef().HighLight(2, .5, new Color(Colors.blue))

  yield* waitFor(1)
  for(let i = 0; i < 3; i++){
    yield ArrayRef().HighLight(i, .5, new Color(Colors.surface))
    yield* waitFor(.7);
  }

  yield* waitUntil('Split3')
  for(let i = 0; i < OutlineRef.length; i++){
    yield OutlineRef[i].position.y(OutlineRef[i].position.y() - 100, .5)
  }


  yield all(
    ArrayRef().boxArray[2].position.y(ArrayRef().boxArray[2].position.y() - 100, .5), 
    ArrayRef().boxArray[3].position.y(ArrayRef().boxArray[3].position.y() - 100, .5), 
    ArrayRef().boxArray[4].position.y(ArrayRef().boxArray[4].position.y() - 100, .5), 
  )

  yield all(
    ArrayRef().boxArray[0].position.y(ArrayRef().boxArray[0].position.y() + 100, .5), 
    ArrayRef().boxArray[1].position.y(ArrayRef().boxArray[1].position.y() + 100, .5), 
    ArrayRef().boxArray[0].position.x(ArrayRef().boxArray[0].position.x() - 24, .5), 
    ArrayRef().boxArray[1].position.x(ArrayRef().boxArray[1].position.x() + 24, .5), 
  )

  view.add(
    <Rect
        ref={makeRef(OutlineRef, 5)}
        x={-(ArrayVal.length/2) * box + (box / 2) - 3*24}
        y={300}
        height={box + padding}
        width={box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  view.add(
    <Rect
        ref={makeRef(OutlineRef, 6)}
        x={-(ArrayVal.length/2) * box + (box / 2) - 24 + box}
        y={300}
        height={box + padding}
        width={box + padding}
        stroke={Colors.blue}
        lineWidth={6}
        radius={new Spacing(4)}
        opacity={0}
      />
  )
  yield* all(
    OutlineRef[5].opacity(1, 1),
    OutlineRef[6].opacity(1, 1)
  )

  yield* waitFor(5);
});



function* newOutline(outlineRef: Rect[], size: number, Nodes: Rect[]){
  
}
