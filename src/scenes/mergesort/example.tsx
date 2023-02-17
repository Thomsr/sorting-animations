import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
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

  yield* waitFor(1)
  yield* all(
    OutlineRef[5].stroke(Colors.surface, .5),
    OutlineRef[6].stroke(Colors.surface, .5),
  )

  yield* waitUntil('Sorted')
  yield* all(
    ArrayRef().HighLight(0, .5, new Color(Colors.green)),
    ArrayRef().HighLight(1, .5, new Color(Colors.green))
  )

  yield* waitFor(1)
  yield* all(
    ArrayRef().HighLight(0, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(1, .5, new Color(Colors.surface))
  )

  yield* waitUntil('7')
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.blue))

  yield* waitUntil('5')
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.blue))

  yield* waitUntil('the way')
  yield* all(
    ArrayRef().HighLight(0, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(1, .5, new Color(Colors.surface)),
  )

  yield* waitUntil('small5')
  yield* all(
    ArrayRef().boxArray[1].position(new Vector2(-360, 100), 1),
    OutlineRef[6].opacity(0, 1)
  )

  yield* waitUntil('last7')
  yield* all(
    ArrayRef().boxArray[0].position(new Vector2(-360+box, 100), 1),
    OutlineRef[5].opacity(0, 1)
  )

  for(let i = 0; i < OutlineRef.length; i++){
    yield OutlineRef[i].position.y(OutlineRef[i].position.y() + 100, 1)
  }
  for(let i = 0; i < ArrayVal.length; i++){
    yield ArrayRef().boxArray[i].position.y(ArrayRef().boxArray[i].position.y() + 100, 1);
  }

  yield* waitUntil('select 57')
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.blue));
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.blue));

  yield* waitUntil('only6')
  yield* ArrayRef().HighLight(2, .5, new Color(Colors.blue));

  yield* waitUntil('deselect')
  yield* all(
    ArrayRef().HighLight(0, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(1, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(2, .5, new Color(Colors.surface)),
  )

  yield* waitUntil('5_1')
  yield* ArrayRef().HighLight(1, .5, new Color(Colors.blue))

  yield* waitUntil('add5')
  yield ArrayRef().boxArray[1].position.x(ArrayRef().boxArray[1].position.x() + 24, 1);
  yield* ArrayRef().boxArray[1].position.y(ArrayRef().boxArray[1].position.y() - 200, 1);

  yield* waitUntil('add6')
  yield ArrayRef().HighLight(1, .5, new Color(Colors.surface))
  yield* ArrayRef().HighLight(2, .5, new Color(Colors.blue))
  yield ArrayRef().boxArray[2].position.x(ArrayRef().boxArray[2].position.x() - 24 - box, 1);
  yield OutlineRef[4].opacity(0, 1)
  yield* ArrayRef().boxArray[2].position.y(ArrayRef().boxArray[2].position.y() - 200, 1);

  yield* waitUntil('add7')
  yield ArrayRef().HighLight(2, .5, new Color(Colors.surface))
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.blue))
  yield ArrayRef().boxArray[0].position.x(ArrayRef().boxArray[0].position.x() + 24 + box, 1);
  yield OutlineRef[3].opacity(0, 1)
  yield* ArrayRef().boxArray[0].position.y(ArrayRef().boxArray[0].position.y() - 200, 1);
  yield* waitFor(1)
  yield* ArrayRef().HighLight(0, .5, new Color(Colors.surface))

  yield* waitUntil('Sorted_1')
  yield ArrayRef().HighLight(1, .5, new Color(Colors.green))
  yield* waitFor(.3)
  yield ArrayRef().HighLight(2, .5, new Color(Colors.green))
  yield* waitFor(.3)
  yield ArrayRef().HighLight(0, .5, new Color(Colors.green))
  yield* waitFor(.3)
  yield* OutlineRef[1].stroke(Colors.green, 1)

  yield* waitUntil('splitright')
  yield ArrayRef().HighLight(0, .5, new Color(Colors.surface))
  yield ArrayRef().HighLight(1, .5, new Color(Colors.surface))
  yield ArrayRef().HighLight(2, .5, new Color(Colors.surface))
  yield OutlineRef[1].stroke(Colors.surface, .5) 
  for(let i = 0; i < OutlineRef.length; i++){
    yield OutlineRef[i].position.y(OutlineRef[i].position.y() + 100, .5)
  }
  for(let i = 0; i < ArrayVal.length; i++){
    yield ArrayRef().boxArray[i].position.y(ArrayRef().boxArray[i].position.y() + 100, .5)
  }
  yield* OutlineRef[2].stroke(Colors.blue, .5)

  yield* waitUntil('Deselect blue border')
  yield* OutlineRef[2].stroke(Colors.surface, .5)

  yield* waitUntil('Split the array')
  for(let i = 0; i < OutlineRef.length; i++){
    yield OutlineRef[i].position.y(OutlineRef[i].position.y() - 100, .5)
  }


  yield all(
    ArrayRef().boxArray[0].position.y(ArrayRef().boxArray[0].position.y() - 100, .5), 
    ArrayRef().boxArray[1].position.y(ArrayRef().boxArray[1].position.y() - 100, .5), 
    ArrayRef().boxArray[2].position.y(ArrayRef().boxArray[2].position.y() - 100, .5), 
  )

  yield all(
    ArrayRef().boxArray[3].position.y(ArrayRef().boxArray[3].position.y() + 100, .5), 
    ArrayRef().boxArray[4].position.y(ArrayRef().boxArray[4].position.y() + 100, .5), 
    ArrayRef().boxArray[3].position.x(ArrayRef().boxArray[3].position.x() - 24, .5), 
    ArrayRef().boxArray[4].position.x(ArrayRef().boxArray[4].position.x() + 24, .5), 
  )

  view.add(
    <Rect
        ref={makeRef(OutlineRef, 3)}
        x={156}
        y={200}
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
        ref={makeRef(OutlineRef, 4)}
        x={360}
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

  yield* waitFor(1)
  yield* all(
    OutlineRef[3].stroke(Colors.surface, .5),
    OutlineRef[4].stroke(Colors.surface, .5),
  )

  yield* waitUntil('Put 2')
  yield* all(
    ArrayRef().HighLight(4, .5, new Color(Colors.blue)),
    ArrayRef().boxArray[4].position.x(ArrayRef().boxArray[4].position.x() - box - 24, 1),
    ArrayRef().boxArray[4].position.y(ArrayRef().boxArray[4].position.y() - 200, 1),
    OutlineRef[4].opacity(0, 1)
  )

  yield* waitUntil('And then 8')
  yield* all(
    ArrayRef().HighLight(4, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(3, .5, new Color(Colors.blue)),
    ArrayRef().boxArray[3].position.x(ArrayRef().boxArray[3].position.x() + box + 24, 1),
    ArrayRef().boxArray[3].position.y(ArrayRef().boxArray[3].position.y() - 200, 1),
    OutlineRef[3].opacity(0, 1)
  )

  yield* waitFor(1)
  yield* ArrayRef().HighLight(3, .5, new Color(Colors.surface))

  
  yield* waitUntil('RightArrayhasbeensorted')
  yield ArrayRef().HighLight(4, .5, new Color(Colors.green))
  yield* waitFor(.3)
  yield ArrayRef().HighLight(3, .5, new Color(Colors.green))

  yield* waitFor(1)
  yield* all(
    ArrayRef().HighLight(3, .5, new Color(Colors.surface)),
    ArrayRef().HighLight(4, .5, new Color(Colors.surface)),
  )

  yield* waitUntil('Lefthalf')
  yield OutlineRef[1].stroke(Colors.blue, 1)
  yield* waitUntil('Righthalf')
  yield* OutlineRef[2].stroke(Colors.blue, 1)

  yield* waitFor(1)
  yield* all(
    OutlineRef[2].stroke(Colors.surface, 1),
    OutlineRef[1].stroke(Colors.surface, 1),
  )

  yield* waitUntil('Finding smallest')
  yield ArrayRef().HighLight(4, .5, new Color(Colors.blue)),

  yield* waitUntil('Putting it')
  yield* all(
    ArrayRef().boxArray[4].position.x(ArrayRef().boxArray[4].position.x() -3*box - 24, 1),
    ArrayRef().boxArray[4].position.y(ArrayRef().boxArray[4].position.y() - 200, 1),
  )

  yield* waitUntil('findSmallestelement2')
  yield ArrayRef().HighLight(1, .5, new Color(Colors.blue)),
  yield ArrayRef().HighLight(4, .5, new Color(Colors.surface)),

  yield* waitUntil('putSmallest')
  yield* all(
    ArrayRef().boxArray[1].position.x(ArrayRef().boxArray[1].position.x() + box + 24, 1),
    ArrayRef().boxArray[1].position.y(ArrayRef().boxArray[1].position.y() - 200, 1),
  )

  yield* waitUntil('yougethe')
  yield ArrayRef().HighLight(1, .5, new Color(Colors.surface))
  yield ArrayRef().boxArray[2].position.x(ArrayRef().boxArray[2].position.x() + 24 + box, 1)
  yield ArrayRef().boxArray[2].position.y(ArrayRef().boxArray[2].position.y() - 200, 1)

  yield ArrayRef().boxArray[0].position.x(ArrayRef().boxArray[0].position.x() + 24 + box, 1)
  yield ArrayRef().boxArray[0].position.y(ArrayRef().boxArray[0].position.y() - 200, 1)

  yield OutlineRef[1].opacity(0, 1)

  yield ArrayRef().boxArray[3].position.x(ArrayRef().boxArray[3].position.x() - 2 - 24, 1)
  yield ArrayRef().boxArray[3].position.y(ArrayRef().boxArray[3].position.y() - 200, 1)

  yield OutlineRef[2].opacity(0, 1)

  yield OutlineRef[0].position.y(OutlineRef[0].position.y() + 200, 1)
  for(let i = 0; i < ArrayVal.length; i++){
    yield ArrayRef().boxArray[i].position.y(0, 1)
  }



  yield* waitFor(100);
});



function* newOutline(outlineRef: Rect[], size: number, Nodes: Rect[]){
  
}
