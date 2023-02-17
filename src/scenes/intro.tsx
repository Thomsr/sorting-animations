import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Node, Line} from '@motion-canvas/2d/lib/components/'
import {Vector2} from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { easeInOutCubic, tween } from '@motion-canvas/core/lib/tweening';

const RED = '#ff6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';
const WHITE = '#fff'

export default makeScene2D(function* (view) {

  const topLength = 200;
  const bottomLength = 220;
  const Width = 50

  const Top = createRef<Line>();
  const Bottom = createRef<Line>();

  const T = createRef<Node>();

  view.add(
    <Node ref={T}>
      <Line 
        ref={Top}
        stroke={WHITE}
        lineWidth={Width}
        points={[Vector2.zero, () => Vector2.right.scale(topLength)]}
        x={-topLength/2}
        y={-50}
      />
      <Line 
        ref={Bottom}
        stroke={WHITE}
        lineWidth={Width}
        points={[Vector2.zero, () => Vector2.down]}
        y={-bottomLength/2 + Width}
      />
    </Node>
  )

  yield* tween(1, value =>{
    Top().points([
      Vector2.zero,
      Vector2.lerp(
        Vector2.zero,
        Vector2.right.scale(topLength),
        easeInOutCubic(value),
      )
    ]
    );
  })

  yield* tween(1, value =>{
    Bottom().points([
      Vector2.zero,
      Vector2.lerp(
        Vector2.zero,
        Vector2.down.scale(-bottomLength),
        easeInOutCubic(value),
      )
    ]
    );
  })

  yield* tween(1, value =>{
    T().opacity(easeInOutCubic(value, 1, 0));
  })
});
