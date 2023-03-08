import { Node, Rect, Text } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { Color, Spacing } from '@motion-canvas/core/lib/types';
import { createRef, range, useLogger, useRandom } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors, BaseFont, textStyle } from '../../styles/styles'
import { selectionSort, insertionSort, bogo } from '../../utils';

export default makeScene2D(function* (view) {
    const ArrayVal = [6, 5, 3, 1, 8, 7]
    const ArrayRef = createRef<Array>()

    // Selection Sort Props
    const smallest = createSignal(0);

    view.add(
        <>
        <Text 
            text={"SELECTION SORT"}
            y={-390-200}
            fontSize={100}
            fontFamily={"Jetbrains Mono"}
            fontWeight={700}
            fill={'white'}
            opacity={.6}
        />
        <Text 
            text={"Full explanation on Youtube"}
            y={-390-115}
            fontSize={50}
            fontFamily={"Jetbrains Mono"}
            // fontWeight={700}
            fill={'white'}
            opacity={.6}
        />
        <Node y={50}>
            <Array
                ref={ArrayRef} 
                values={ArrayVal}
            />
            <Rect 
                stroke={Colors.blue}
                lineWidth={4}
                radius={new Spacing(4)}
                width={2}
                height={128}
                y={() => smallest() * (128+28) - 390}
                x={-128/2 - 20}
            />
        </Node>
        </>
    )

    yield* selectionSort(ArrayRef(), smallest, .5)
    yield* loop(
        ArrayVal.length,
        i => ArrayRef().extraHighLight(i, new Color(Colors.surface), .3)
    ),
    yield* smallest(0, .5)
})