import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor, waitUntil } from '@motion-canvas/core/lib/flow';
import { Color, Direction, Spacing, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef, makeRef, range, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../../styles/styles';
import { Array } from '../../components/ArrayComponent/Array';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Latex, Line, Rect, Txt } from '@motion-canvas/2d/lib/components';
import { slideTransition } from '@motion-canvas/core/lib/transitions' 
import { createEaseInBack } from '@motion-canvas/core/lib/tweening';


export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Bottom, 1)

  const time = createRef<Txt>();
  const textStyle = {
    paddingTop: 10,
    fontFamily: 'JetBrains Mono',
    fill: 'rgba(255, 255, 255, 0.6)',
  };

  view.add(
    <Txt
        ref={time}
        text={"TIME COMPLEXITY"}
        opacity={0}
        fontSize={100}
        lineHeight={100}
        {...textStyle}
    />
  ) 

  yield* time().opacity(1, .5)
  yield* waitFor(.7);
  yield* time().opacity(0, .5)

  const text = createRef<Latex>();
  const lineRef = createRef<Line>();
  const nRef = createRef<Txt>();
  const ArrayRef = createRef<Array>();

  view.add(
    <>
    <Txt 
      ref={text}
      text={"O(n\log n)"}
      fontSize={150}
      lineHeight={150}
      {...textStyle}
      opacity={0}
    />
    <Txt
                ref={nRef}
                text={"n"}
                {...textStyle}
                y={100}
                opacity={0}
            />
    <Line
                ref={lineRef}
                lineCap={'round'}
                lineWidth={4}
                stroke={Colors.blue}
                points={[[-410, 250],[-410, 200], [-.5, 200], [0, 150], [.5, 200], [410, 200], [410, 250]]}
                opacity={0}
            />
    <Array
                ref={ArrayRef}
                opacity={0}
                values={[1, 2, 5, 3, 8]}
                y={300}
            />
    </>
  )

  yield* text().opacity(1, 1)

  yield* waitUntil('Where')
  yield* all(
    text().position.y(-200, 1),
    ArrayRef().opacity(1, 1),
    nRef().opacity(1, 1.2),
    lineRef().opacity(1, 1.2),
  )
  
  yield* waitUntil('back')
  yield* all(
    text().position.y(0, 1),
    ArrayRef().opacity(0, 1),
    nRef().opacity(0, 1.2),
    lineRef().opacity(0, 1.2),
  )

  yield* waitUntil('Large')
  const ArrayVal = [6,5,2,7,8,5,3,3,2,1,5,7,8,4,3,6,7,8,4,3,6,7,8,3,6,9,7,6,5,4,3,6,7,4,3,5,6,7,3,2,5,7,3,8,2,4,6,7,4,5,6,7,5,7,6,6,3,2,8,9,9,0,2,3,4,5,8,3,3,4,5,8,3,9,0,1,2,5,6,8,3,5,3,2,5,9,7,5,4,3,7,8,1];
  view.add(
      <Array
          ref={ArrayRef}
          values={ArrayVal}
      />
  )

  
  for(let i = 0; i < 7; i++){
    for(let j = 0; j < 12; j++){
      ArrayRef().boxArray[i * 12 + j].opacity(0);
      ArrayRef().boxArray[i * 12 + j].position.y(-(540-(28+128)/2) + i * (128+28))
      ArrayRef().boxArray[i * 12 + j].position.x(-(1920 / 2-(128+28+50)/2) + j * (128+28))
    }
  }
  yield* text().opacity(0, .5)
  
  for(let i = 0; i < 6; i++){
      for(let j = 0; j < 12; j++){
          yield* any(
              ArrayRef().boxArray[i * 12 + j].opacity(1, .07),
              waitFor(.03),
          ) 
      }
  }
  yield* waitUntil('go away')
  yield* ArrayRef().opacity(0, .5)

  view.add(
    <Txt
      ref={text} 
      text={"Thanks for Watching!"}
      fontSize={80}
      fontWeight={800}
      opacity={0}
      {...textStyle}
    />
  )

  yield* text().opacity(1, 1);
  yield* waitFor(15 );
})