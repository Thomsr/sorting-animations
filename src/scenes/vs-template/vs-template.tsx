import { Node, Rect, Txt } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { Color, Spacing } from '@motion-canvas/core/lib/types';
import { createRef, range, useLogger, useRandom } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors, BaseFont, textStyle } from '../../styles/styles'
import { selectionSort, insertionSort, bogo } from '../../utils';

export default makeScene2D(function* (view) {
    const ArrayValues1 = [6, 5, 3, 1, 8]
    const ArrayValues2 = [6, 5, 3, 1, 8]

    const box = 128 + 28
    const out = createRef<Rect>();
    const smallest = createSignal(0);

    const boxsignal = createSignal(2);

    const Node1 = createRef<Node>()
    const Node2 = createRef<Node>()

    const Array1 = createRef<Array>()
    const Array2 = createRef<Array>()

    view.add(
    <>
    <Node y={80}>
        <Node ref={Node1} x={-250}>
            <Txt 
                text={"SELECTION"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={Array1}
                values={ArrayValues1}
            />
            <Rect 
                ref={out}
                stroke={Colors.blue}
                lineWidth={6}
                width={box + 8}
                y={(2/2) * box - (box / 2) - 2*box}
                radius={new Spacing(4)}
                height={() => boxsignal() * box + 8}
                opacity={0}
            />
            <Rect
                stroke={Colors.blue}
                lineWidth={4}
                radius={new Spacing(4)}
                width={2}
                height={128}
                y={() => smallest() * (128+28) - 312}
                x={-128/2 - 20}
            />
        </Node>
        <Txt 
            text={"VS"}
            y={-450}
            fontWeight={800}
            {...textStyle}
            fill={Colors.blue}
        />
        <Node ref={Node2} x={250}>
            <Txt 
                text={"INSERTION"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={Array2}
                values={ArrayValues2}
            />
        </Node>
        <Txt 
            text={"WHO WILL WIN?"}
            y={-600}
            fontWeight={800}
            fontSize={90}
            {...textStyle}
            shadowBlur={10}
            shadowColor={Colors.blue}
            fill={Colors.blue}
        />
    </Node>
    </>
    )
    yield* all(
        selectionSort(Array1(), smallest),
        insertionSort(Array2()),
    )
    yield* waitFor(1);
    yield* all(
        loop(
            ArrayValues1.length,
            i => Array1().extraHighLight(i, new Color(Colors.surface), .3)
        ),
        loop(
            ArrayValues1.length,
            i => Array2().extraHighLight(i, new Color(Colors.surface), .3)
        ),
    )
    yield* smallest(0, .4)
    // yield ArrayBogo().removeBlur(3, new Color(Colors.surface), .3)
    // yield* ArrayBogo().HighLight(3, .3, new Color(Colors.surface))
    // yield ArrayBogo().removeBlur(2, new Color(Colors.surface), .3)
    // yield* ArrayBogo().HighLight(2, .3, new Color(Colors.surface))
    // yield ArrayBogo().removeBlur(0, new Color(Colors.surface), .3)
    // yield* ArrayBogo().HighLight(0, .3, new Color(Colors.surface))
    // yield ArrayBogo().removeBlur(1, new Color(Colors.surface), .3)
    // yield* ArrayBogo().HighLight(1, .3, new Color(Colors.surface))
    // yield ArrayBogo().removeBlur(4, new Color(Colors.surface), .3)
    // yield* ArrayBogo().HighLight(4, .3, new Color(Colors.surface))
    // yield out().stroke(Colors.blue, .3)
    // yield boxsignal(2, .3)
    // yield* out().position.y(-390+128+28, .3)
})

function* merge(ArrayValues: number[], ArrayMerge: Array, box: SimpleSignal<number>, Outline: Rect){
    yield* all(
        ArrayMerge.extraHighLight(0, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(1, new Color(Colors.blue), .5),
    )
    yield* ArrayMerge.Swap(0, 1, true, .5)
    yield* all(
        ArrayMerge.removeBlur(0, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(1, new Color(Colors.surface), .5),
        ArrayMerge.HighLight(0, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(1, .5, new Color(Colors.surface)),
    )
    yield* all(
        box(3, .5),
        Outline.position.y(-156, .5)    
    )
    yield* all(
        ArrayMerge.extraHighLight(0, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(1, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(2, new Color(Colors.blue), .5),
    )
    yield* all(
        ArrayMerge.boxArray[0].position.y(-156, .5),
        ArrayMerge.boxArray[1].position.y(0, .5),
        ArrayMerge.boxArray[2].position.y(-312, .5),
    )
    yield* all(
        ArrayMerge.removeBlur(0, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(1, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(2, new Color(Colors.surface), .5),
        ArrayMerge.HighLight(0, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(1, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(2, .5, new Color(Colors.surface)),
    )
    yield* all(
        box(2, .5),
        Outline.position.y(-(2/2) * (128+28) + ((128+28) / 2) + 2*(128+28), .5)
    )
    yield* all(
        ArrayMerge.extraHighLight(3, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(4, new Color(Colors.blue), .5),
    )
    yield* all(
        ArrayMerge.removeBlur(3, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(4, new Color(Colors.surface), .5),
        ArrayMerge.HighLight(3, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(4, .5, new Color(Colors.surface)),
    )
    yield* all(
        box(5, .5),
        Outline.position.y(-(5/2) * (128+28) + ((128+28) / 2) + 2*(128+28), .5)
    )
    yield* all(
        ArrayMerge.extraHighLight(0, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(1, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(2, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(3, new Color(Colors.blue), .5),
        ArrayMerge.extraHighLight(4, new Color(Colors.blue), .5),
    )
    yield* all(
        ArrayMerge.boxArray[0].position.y(0, .5),
        ArrayMerge.boxArray[1].position.y(156, .5),
        ArrayMerge.boxArray[2].position.y(-156, .5),
        ArrayMerge.boxArray[3].position.y(-312, .5),
    )
    yield* all(
        ArrayMerge.removeBlur(0, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(1, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(2, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(3, new Color(Colors.surface), .5),
        ArrayMerge.removeBlur(4, new Color(Colors.surface), .5),
        ArrayMerge.HighLight(0, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(1, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(2, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(3, .5, new Color(Colors.surface)),
        ArrayMerge.HighLight(4, .5, new Color(Colors.surface)),
    )
    yield ArrayMerge.extraHighLight(3, new Color(Colors.green), .3)
    yield* waitFor(.2)
    yield ArrayMerge.extraHighLight(2, new Color(Colors.green), .3)
    yield* waitFor(.2)
    yield ArrayMerge.extraHighLight(0, new Color(Colors.green), .3)
    yield* waitFor(.2)
    yield ArrayMerge.extraHighLight(1, new Color(Colors.green), .3)
    yield* waitFor(.2)
    yield ArrayMerge.extraHighLight(4, new Color(Colors.green), .3)
    yield* waitFor(.2)
    yield* Outline.stroke(Colors.green, .5)
}