import { Node, Rect, Text } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { createSignal, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { Color, Spacing } from '@motion-canvas/core/lib/types';
import { createRef, range, useLogger, useRandom } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors, BaseFont, textStyle } from '../../styles/styles'

export default makeScene2D(function* (view) {
    const ArrayValues = [6, 5, 3, 1, 8]
    const ArrayValues2 = [6, 5, 3, 1, 8]

    const box = 128 + 28
    const out = createRef<Rect>();

    const boxsignal = createSignal(2);

    const NodeBogo = createRef<Node>()
    const NodeMerge = createRef<Node>()

    const ArrayBogo = createRef<Array>()
    const ArrayMerge = createRef<Array>()

    view.add(
    <>
    <Node y={80}>
        <Node ref={NodeBogo} x={-250}>
            <Text 
                text={"MERGE"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={ArrayBogo}
                values={ArrayValues}
            />
            <Rect 
                ref={out}
                stroke={Colors.blue}
                lineWidth={6}
                width={box + 8}
                y={(2/2) * box - (box / 2) - 2*box}
                radius={new Spacing(4)}
                height={() => boxsignal() * box + 8}
                opacity={1}
            />
        </Node>
        <Text 
            text={"VS"}
            y={-450}
            fontWeight={800}
            {...textStyle}
            fill={Colors.blue}
        />
        <Node ref={NodeMerge} x={250}>
            <Text 
                text={"INSERTION"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={ArrayMerge}
                values={ArrayValues2}
            />
        </Node>
        <Text 
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
        merge(ArrayValues, ArrayBogo(), boxsignal, out()),
        insertionSort(ArrayMerge()),
    )
    yield* waitFor(1);
    yield all(
        // loop(
        //     ArrayValues.length,
        //     i => ArrayBogo().extraHighLight(i, new Color(Colors.surface), .3)
        // ),
        loop(
            ArrayValues.length,
            i => ArrayMerge().extraHighLight(i, new Color(Colors.surface), .3)
        ),
    )
    yield ArrayBogo().removeBlur(3, new Color(Colors.surface), .3)
    yield* ArrayBogo().HighLight(3, .3, new Color(Colors.surface))
    yield ArrayBogo().removeBlur(2, new Color(Colors.surface), .3)
    yield* ArrayBogo().HighLight(2, .3, new Color(Colors.surface))
    yield ArrayBogo().removeBlur(0, new Color(Colors.surface), .3)
    yield* ArrayBogo().HighLight(0, .3, new Color(Colors.surface))
    yield ArrayBogo().removeBlur(1, new Color(Colors.surface), .3)
    yield* ArrayBogo().HighLight(1, .3, new Color(Colors.surface))
    yield ArrayBogo().removeBlur(4, new Color(Colors.surface), .3)
    yield* ArrayBogo().HighLight(4, .3, new Color(Colors.surface))
    yield out().stroke(Colors.blue, .3)
    yield boxsignal(2, .3)
    yield* out().position.y(-390+128+28, .3)
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

function* insertionSort(Array: Array){
    for(let i = 1; i < Array.values().length; i++){
        let j = i;
        while(j > 0){
            yield* Array.extraHighLight(j-1, new Color(Colors.blue), .3)
            yield* Array.extraHighLight(j, new Color(Colors.blue), .3)
            if(Array.values()[j-1] > Array.values()[j]){
                yield* Array.Swap(j, j-1, false, .5);
            } else{
                yield* all(
                Array.extraHighLight(j-1, new Color(Colors.surface), .3),
                Array.extraHighLight(j, new Color(Colors.surface), .3),
                );
                break;
            }
            yield* all(
                Array.extraHighLight(j-1, new Color(Colors.surface), .3),
                Array.extraHighLight(j, new Color(Colors.surface), .3),
            );
            j -= 1;
        } 
    }
    for(let i = 0; i < Array.values().length; i++){
        yield* any(
            Array.extraHighLight(i, new Color(Colors.green), .3),
            waitFor(.2)
        )
    }
}

function* bogo(ArrayValues: number[], ArrayBogo: Array){
    const random = useRandom();
    for(let k = 0; k < 4; k++){
        for(let i = ArrayValues.length - 1; i > 0; i--) {
            const j = random.nextInt(0, i+1);
            yield* ArrayBogo.Swapwith(i, j, true, 0);
        }
        yield* HighLight(ArrayBogo, ArrayValues);
    }
}

function* HighLight(Array: Array, ArrayVal: number[]){
    yield* Array.extraHighLight(0, new Color(Colors.green), .3);
    for(let i = 0; i < ArrayVal.length-1; i++){
        if(ArrayVal[i] < ArrayVal[i+1]){
            yield* Array.extraHighLight(i+1, new Color(Colors.green), .3);
        } else {
            yield*  Array.extraHighLight(i+1, new Color(Colors.red), .3);
            yield* all(
                Array.HighLight(i+1, .2, new Color(Colors.surface)),
                Array.removeBlur(i+1, new Color(Colors.surface), .2)
            ) 
            useLogger().debug(i.toString());
            for(let j = i; j >= 0; j--){
                yield* all(
                    Array.HighLight(j, .2, new Color(Colors.surface)),
                    Array.removeBlur(j, new Color(Colors.surface), .2)
                )
            }
            return;
        } 
    }
}
 