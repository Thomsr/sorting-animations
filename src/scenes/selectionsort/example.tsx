import { makeScene2D } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { Array } from "../..//components/ArrayComponent/Array";
import { Colors } from "@/styles/styles"
import { createRef, useLogger } from "@motion-canvas/core/lib/utils";
import { Color, Spacing } from "@motion-canvas/core/lib/types";
import { Rect } from "@motion-canvas/2d/lib/components";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {
    const ArrayVal = [9, 4, 2, 7, 1]
    const ArrayRef = createRef<Array>();

    const smallest = createSignal(0);
    const smallest2 = createSignal(0);

    view.add(
        <>
        <Array
            ref={ArrayRef}
            values={ArrayVal}
        />
        <Rect
            stroke={Colors.blue}
            lineWidth={4}
            radius={new Spacing(4)}
            width={128}
            height={2}
            x={() => smallest() * (128+28) - 312}
            y={128/2 + 18}
        />
        <Rect
            stroke={Colors.blue}
            lineWidth={4}
            radius={new Spacing(4)}
            width={128}
            height={2}
            x={() => smallest2() * (128+28) - 312}
            y={-128/2 - 18}
        />
        </>
    )
    yield* selectionSort(ArrayRef(), smallest, smallest2);
})

function* selectionSort(Array: Array, Smallest: SimpleSignal<number>, Smallest2: SimpleSignal<number>){
    let i, j, min_idx;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < Array.children().length-1; i++){
        // Find the minimum element in unsorted array
        min_idx = i;
        yield* Smallest(min_idx, .5);
        yield* Array.HighLight(i, 1, new Color(Colors.blue));
        for (j = i + 1; j < Array.children().length; j++){
            yield* Smallest2(j, .5);
            if (Array.values()[j] < Array.values()[min_idx]){
                min_idx = j;
                yield* Smallest(min_idx, .5);
            }
        }
        // Swap the found minimum element with the first element
        yield* Array.HighLight(i, 1, new Color(Colors.surface));
        yield* Array.Swapwith(min_idx, i, true, 1);
    } 
}