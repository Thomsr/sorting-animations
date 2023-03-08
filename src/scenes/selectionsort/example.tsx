import { makeScene2D } from "@motion-canvas/2d";
import { all, any, sequence, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";
import { Array } from "../..//components/ArrayComponent/Array";
import { Colors } from "@/styles/styles"
import { createRef, useLogger } from "@motion-canvas/core/lib/utils";
import { Color, Spacing } from "@motion-canvas/core/lib/types";
import { Img, Node, Rect } from "@motion-canvas/2d/lib/components";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";
import swapIcon from "../../../images/icons/swap Icon.png"
import minIcon from "../../../images/icons/min Icon.png"
import expandIcon from "../../../images/icons/expand Icon.png"
import swapIconblue from "../../../images/icons/swap Icon blue.png"
import minIconblue from "../../../images/icons/min Icon blue.png"
import expandIconblue from "../../../images/icons/expand Icon blue.png"

export default makeScene2D(function* (view) {
    const ArrayVal = [9, 7, 2, 4, 1]
    const ArrayRef = createRef<Array>();

    const smallest = createSignal(0);
    const smallest2 = createSignal(0);

    const index = createRef<Rect>()

    view.add(
        <>
        <Array
            ref={ArrayRef}
            values={ArrayVal}
        />
        <Rect
            ref={index}
            stroke={Colors.blue}
            lineWidth={4}
            radius={new Spacing(4)}
            width={128}
            height={2}
            x={() => smallest() * (128+28) - 312 + 128}
            y={128/2 + 18}
            opacity={0}
        />
        <Rect
            stroke={Colors.blue}
            lineWidth={4}
            radius={new Spacing(4)}
            width={128}
            height={2}
            x={() => smallest2() * (128+28) - 312}
            y={-128/2 - 18}
            opacity={0}
        />
        </>
    )
    yield* waitUntil('Minimum');
    yield ArrayRef().HighLight(4, 1, new Color(Colors.blue));
    yield* waitFor(.5);
    yield ArrayRef().HighLight(2, 1, new Color(Colors.blue));
    yield* waitFor(.5);
    yield ArrayRef().HighLight(3, 1, new Color(Colors.blue));
    yield* waitFor(.5);
    yield ArrayRef().HighLight(1, 1, new Color(Colors.blue));
    yield* waitFor(.5);
    yield ArrayRef().HighLight(0, 1, new Color(Colors.blue));
    yield* waitFor(.5);

    yield* waitFor(1)
    yield* all(
        ArrayRef().HighLight(0, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(1, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(2, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(3, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(4, .5, new Color(Colors.surface)),
    )
    
    yield* waitUntil('beginn')
    yield* ArrayRef().Swap(0, 4, true, 1);

    yield* waitUntil('Sorted')
    yield* ArrayRef().Swap(1, 2, true, 1)
    yield* ArrayRef().Swap(2, 3, true, 1)

    for(let i = 0; i < 5; i++){
        yield* any(
            waitFor(.2),
            ArrayRef().HighLight(i, .4, new Color(Colors.green)),
        )
    }

    yield* waitUntil('How it works')
    yield* ArrayRef().opacity(0, 1);

    const iconsRef = createRef<Node>();

    const minRef = createRef<Img>();
    const swapRef = createRef<Img>();
    const expandRef = createRef<Img>();

    const rect = createRef<Rect>();

    view.add(
        <>
        <Rect
            ref={rect} 
            fill={Colors.surface}
            width={256}
            height={1080}
            x={-(1920/2)}
            offset={[1, 0]}
        />
        <Node ref={iconsRef} opacity={0}>
            <Rect
                ref={minRef}
                stroke={Colors.COMMENT}
                lineWidth={8}
                size={[128,128]}
                radius={new Spacing(4)}
                x={-(128+28)}
            >
                <Img src={minIcon} />
            </Rect>
            <Rect
                ref={swapRef}
                stroke={Colors.COMMENT}
                lineWidth={8}
                size={[128,128]}
                radius={new Spacing(4)}
            >
                <Img src={swapIcon} />
            </Rect>
            <Rect
                ref={expandRef}
                stroke={Colors.COMMENT}
                lineWidth={8}
                size={[128,128]}
                radius={new Spacing(4)}
                x={(128+28)}
            >
                <Img src={expandIcon} />
            </Rect>
        </Node>
        </>
    )
    yield* rect().position.x(rect().position.x() + 256, .5),
    minRef().position.x(-960 + 128),
    minRef().position.y(-128-38),
    swapRef().position.x(-960 + 128),
    expandRef().position.x(-960 + 128),
    expandRef().position.y(+128+38),
    yield* iconsRef().opacity(1, .5);
    for(let i = 0; i < 5; i++){
        yield* ArrayRef().HighLight(i, 0, new Color(Colors.surface));
    }
    yield ArrayRef().Swap(0, 2, true, 0)
    ArrayRef().position.x(128)
    yield* all(
        ArrayRef().opacity(1, .5),
        index().opacity(1, .5)
    )

    
    yield* waitUntil('Minimum2')
    yield minRef().stroke(Colors.blue, .5);
    const minBlue = createRef<Img>();
    view.add(
        <Img
            ref={minBlue}
            src={minIconblue} 
            x={-960+128} 
            y={-128-38}
            opacity={0}
        />
    )
    yield* minBlue().opacity(1, .5)
    yield* ArrayRef().HighLight(0, .5, new Color(Colors.blue))
    yield* all(
        ArrayRef().HighLight(0, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(1, .5, new Color(Colors.blue))
    )
    yield* all(
        ArrayRef().HighLight(1, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(2, .5, new Color(Colors.green))
    )
    yield* ArrayRef().HighLight(3, .5, new Color(Colors.blue))
    yield* all(
        ArrayRef().HighLight(3, .5, new Color(Colors.surface)),
        ArrayRef().HighLight(4, .5, new Color(Colors.blue))
    )
    yield* ArrayRef().HighLight(4, .5, new Color(Colors.surface))
    yield* waitUntil('Swap')
    const swapBlue = createRef<Img>();
    view.add(
        <Img
            ref={swapBlue}
            src={swapIconblue} 
            x={-960+128} 
            opacity={0}
        />
    )
    yield* all(
        minRef().stroke(Colors.COMMENT, 1),
        minBlue().opacity(0, 1),
        swapRef().stroke(Colors.blue, 1),
        swapBlue().opacity(1, 1)
    ) 
    yield* ArrayRef().Swap(0, 2, false, 1);

    yield* waitUntil('Move')
    const movebox = createRef<Rect>();
    view.add(
        <Rect 
            ref={movebox}
            stroke={Colors.green}
            height={128+28}
            lineWidth={6}
            x={-312+128/2-28/2}
            opacity={0}
            radius={new Spacing(4)}
        />
    )
    const expandBlue = createRef<Img>();
    view.add(
        <Img 
            ref={expandBlue}
            src={expandIconblue} 
            x={-960+128} 
            y={128+38}
            opacity={0}
        />
    )
    yield* all(
        swapRef().stroke(Colors.COMMENT, 1),
        swapBlue().opacity(0, 1),
        expandRef().stroke(Colors.blue, 1),
        expandBlue().opacity(1, 1)
    ) 
    yield* ArrayRef().HighLight(0, .7, new Color(Colors.surface))
    // yield* movebox().opacity(1, .5)
    // yield* all(
    //     movebox().size.x(128+28, 1),
    //     movebox().position.x(-312+128, 1),
    // )
    yield* smallest(1, 1)
    yield* waitUntil('Marking')
    yield* ArrayRef().HighLight(0, 1, new Color(Colors.green));
    yield* waitFor(2)
    yield* all(
        expandRef().stroke(Colors.COMMENT, 1),
        expandBlue().opacity(0, 1),
    )

    yield* waitUntil('Then')
    yield* all(
        ArrayRef().opacity(0, 1),
        movebox().opacity(0, 1),
        index().opacity(0, 1),
        rect().position.x(-(1920/2), 1),
    ) 
    yield* all(
        minRef().position.x(minRef().position.y(), 1),
        minRef().position.y(0, 1),
        swapRef().position.x(swapRef().position.y(), 1),
        swapRef().position.y(0, 1),
        expandRef().position.x(expandRef().position.y(), 1),
        expandRef().position.y(0, 1),

        minBlue().position.x(minRef().position.y(), 1),
        minBlue().position.y(0, 1),
        swapBlue().position.x(swapRef().position.y(), 1),
        swapBlue().position.y(0, 1),
        expandBlue().position.x(expandRef().position.y(), 1),
        expandBlue().position.y(0, 1),
    )
    yield* all(
        minRef().stroke(Colors.blue, .5),
        minBlue().opacity(1, .5)
    ) 
    yield* all(
        minRef().stroke(Colors.COMMENT, .5),
        minBlue().opacity(0, .5),
        swapRef().stroke(Colors.blue, .5),
        swapBlue().opacity(1, .5)
    ) 
    yield* all(
        swapRef().stroke(Colors.COMMENT, .5),
        swapBlue().opacity(0, .5),
        expandRef().stroke(Colors.blue, .5),
        expandBlue().opacity(1, .5)
    ) 
    yield* all(
        expandRef().stroke(Colors.COMMENT, .5),
        expandBlue().opacity(0, .5)
    ) 
 
    yield* waitUntil('Next')

    // yield* selectionSort(ArrayRef(), smallest, smallest2);
})

function* selectionSort(Array: Array, Smallest: SimpleSignal<number>, Smallest2: SimpleSignal<number>){
    let i, j, min_idx;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < Array.children().length-1; i++){
        // Find the minimum element in unsorted array
        min_idx = i;
        yield* Smallest(i, .5);
        yield* Array.HighLight(min_idx, .5, new Color(Colors.blue));
        for (j = i + 1; j < Array.children().length; j++){
            yield* Array.HighLight(j, 1, new Color(Colors.blue));
            if (Array.values()[j] < Array.values()[min_idx]){
                yield* Array.HighLight(min_idx, .5, new Color(Colors.surface));
                min_idx = j;
            } else yield* Array.HighLight(j, .5, new Color(Colors.surface));
        }
        // Swap the found minimum element with the first element
        yield* Array.Swapwith(min_idx, i, true, .5);
        yield* Array.HighLight(i, 1, new Color(Colors.green));
    } 
    yield* Array.HighLight(i, 1, new Color(Colors.green));
}