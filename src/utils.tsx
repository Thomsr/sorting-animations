import { SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Color } from "@motion-canvas/core/lib/types";
import { Colors } from "./styles/styles";
import { Array } from "./components/ArrayComponent/Array"
import { all, any, waitFor } from "@motion-canvas/core/lib/flow";
import { useLogger, useRandom } from "@motion-canvas/core/lib/utils";

export function* selectionSort(Array: Array, Smallest: SimpleSignal<number>, Duration: number = .3){
    let i, j, min_idx;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < Array.children().length-1; i++){
        // Find the minimum element in unsorted array
        min_idx = i;
        yield Smallest(i, .5);
        yield* Array.extraHighLight(min_idx, new Color(Colors.blue), Duration);
        for (j = i + 1; j < Array.children().length; j++){
            yield* Array.extraHighLight(j, new Color(Colors.blue), Duration);
            if (Array.values()[j] < Array.values()[min_idx]){
                yield* all(
                    Array.HighLight(min_idx, .5, new Color(Colors.surface)),
                    Array.removeBlur(min_idx, new Color(Colors.surface), Duration),
                )
                min_idx = j;
            } else yield* all(
                Array.HighLight(j, .5, new Color(Colors.surface)),
                Array.removeBlur(j, new Color(Colors.surface), Duration),
            )
        }
        // Swap the found minimum element with the first element
        yield* Array.Swapwith(min_idx, i, true, .5);
        yield Array.extraHighLight(i, new Color(Colors.green), Duration);
    } 
    yield* waitFor(Duration)
    yield* Array.extraHighLight(i, new Color(Colors.green), Duration);
}

export function* insertionSort(Array: Array){
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

export function* bogo(ArrayValues: number[], ArrayBogo: Array){
    const random = useRandom();
    for(let k = 0; k < 4; k++){
        for(let i = ArrayValues.length - 1; i > 0; i--) {
            const j = random.nextInt(0, i+1);
            yield* ArrayBogo.Swapwith(i, j, true, 0);
        }
        yield* HighLight(ArrayBogo, ArrayValues);
    }
}

export function* HighLight(Array: Array, ArrayVal: number[]){
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