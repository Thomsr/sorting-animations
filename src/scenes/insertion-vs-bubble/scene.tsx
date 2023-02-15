import { Node, Text } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, any, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef, range } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array'
import { Colors, BaseFont, textStyle } from '../../styles/styles'

export default makeScene2D(function* (view) {
    
    const ArrayValues = [6, 5, 3, 1, 8]
    const ArrayValues2 = [6, 5, 3, 1, 8]

    const NodeBubble = createRef<Node>()
    const NodeInsertion = createRef<Node>()

    const ArrayBubble = createRef<Array>()
    const ArrayInsertion = createRef<Array>()

    view.add(
    <>
    <Node y={80}>
        <Node ref={NodeBubble} x={-250}>
            <Text 
                text={"INSERTION"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={ArrayInsertion}
                values={ArrayValues}
            />
        </Node>
        <Text 
            text={"VS"}
            y={-450}
            fontWeight={800}
            {...textStyle}
            fill={Colors.blue}
        />
        <Node ref={NodeInsertion} x={250}>
            <Text 
                text={"BUBBLE"}
                y={-450}
                {...textStyle}
            />
            <Array
                ref={ArrayBubble}
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
        bubbleSort(ArrayBubble()),
        insertionSort(ArrayInsertion()),
    )
    yield* waitFor(1);
    yield* all(
        loop(
            ArrayValues.length,
            i => ArrayBubble().extraHighLight(i, new Color(Colors.surface), .3)
        ),
        loop(
            ArrayValues.length,
            i => ArrayInsertion().extraHighLight(i, new Color(Colors.surface), .3)
        )
    )
    yield* waitFor(.5 );
})

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

function* bubbleSort(Array: Array){
    for(let i = 0; i < Array.values().length; i++){
        for(let j = 0; j < Array.values().length-i-1; j++){
            yield*Array.extraHighLight(j, new Color(Colors.blue), .3);
            yield* Array.extraHighLight(j+1, new Color(Colors.blue), .3);
            if(Array.values()[j] > Array.values()[j+1]){
              yield* Array.Swapwith(j, j+1, true, .5);
            }
            yield* all(
              Array.extraHighLight(j, new Color(Colors.surface), .3),
              Array.extraHighLight(j+1, new Color(Colors.surface), .3),
            )
        }
        yield* Array.extraHighLight(Array.values().length-i-1, new Color(Colors.green), .3)
    }
}
