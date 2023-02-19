import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Color, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef, makeRef, range, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../../styles/styles';
import { Array } from '../../components/ArrayComponent/Array';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Rect } from '@motion-canvas/2d/lib/components';


export default makeScene2D(function* (view) {
    const ArrayVal = [4, 2, 1, 8, 4, 9, 3];
    const boxGap = 28;
    const boxWidth = 128;
    const padding = 8;
    const box = boxGap + boxWidth;
  
    const ArrayRef = createRef<Array>();
    const OutlineRef1  = createRef<Rect>();
    const OutlineRef2  = createRef<Rect>();
    const OutlineRef3  = createRef<Rect>();
  
    view.add(
      <>
        <Array
          ref={ArrayRef}
          values={ArrayVal}
          boxGap={boxGap}
        />
        <Rect
          ref={OutlineRef3}
          x={-(ArrayVal.length/2) * (box) + 7 * ((box) / 2)}
          height={box + padding}
          width={7 * box + padding}
          stroke={Colors.surface}
          lineWidth={6}
          radius={new Spacing(4)}
          opacity={0}
        />
        <Rect
          ref={OutlineRef1}
          x={-(ArrayVal.length/2) * (box) + 4 * ((box) / 2) - 12}
          y={100}
          height={box + padding}
          width={4 * box + padding}
          stroke={Colors.blue}
          lineWidth={6}
          radius={new Spacing(4)}
          opacity={0}
        />
        <Rect
          ref={OutlineRef2}
          x={(ArrayVal.length/2) * (box) - 3 * ((box) / 2) + 12}
          y={100}
          height={box + padding}
          width={3 * box + padding}
          stroke={Colors.blue}
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
    yield* OutlineRef3().opacity(1, .5)

    yield* waitUntil('Divide');
    yield OutlineRef3().position.y(-100, .5);
    for(let i = 0; i < 4; i++){
      yield ArrayRef().children()[i].position.x(ArrayRef().boxArray[i].position.x() - 12, .5)
      yield ArrayRef().children()[i].position.y(ArrayRef().boxArray[i].position.y() + 100, .5)
    }
    for(let i = 4; i < 7; i++){
      yield ArrayRef().children()[i].position.x(ArrayRef().boxArray[i].position.x() + 12, .5)
      yield ArrayRef().children()[i].position.y(ArrayRef().boxArray[i].position.y() + 100, .5)
    }

    yield* all(
      OutlineRef1().opacity(1, 1),
      OutlineRef2().opacity(1, 1),
    )

    yield* waitUntil('Sorting');
    yield ArrayRef().children()[0].position.x(-168, 1)  
    yield ArrayRef().children()[2].position.x(-480, 1)  

    yield ArrayRef().children()[4].position.x(324, 1)  
    yield ArrayRef().children()[5].position.x(480, 1)  
    yield ArrayRef().children()[6].position.x(168, 1)  

    yield* waitUntil('Merge');
    yield* all(
      ArrayRef().children()[2].position(new Vector2(-468, 0), 1),
      ArrayRef().children()[1].position(new Vector2(-468+box, 0), 1),
      ArrayRef().children()[6].position(new Vector2(-468+2*box, 0), 1),
      ArrayRef().children()[0].position(new Vector2(-468+3*box, 0), 1),
      ArrayRef().children()[4].position(new Vector2(-468+4*box, 0), 1),
      ArrayRef().children()[3].position(new Vector2(-468+5*box, 0), 1),
      ArrayRef().children()[5].position(new Vector2(-468+6*box, 0), 1),
      OutlineRef1().opacity(0, .5),
      OutlineRef2().opacity(0, .5),
      OutlineRef3().position.y(0, .5)
    )

    yield* waitUntil('Sorted');
    yield ArrayRef().HighLight(2, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(1, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(6, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(0, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(4, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(3, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield ArrayRef().HighLight(5, .5, new Color(Colors.green))
    yield* waitFor(.5)
    yield* OutlineRef3().stroke(Colors.green, 1);

    yield* waitUntil('next');
})
