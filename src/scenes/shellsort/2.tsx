import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array';
import { Colors } from '../../styles/styles'

export default makeScene2D(function* (view) {
    const ArrayVal = [4, 6, 7, 8, 2, 7, 9, 8 ]
    const ArrayRef = createRef<Array>()
    
    view.add(
        <Array
            ref={ArrayRef}
            values={ArrayVal}
        />
    )

    
    yield* shellSort(ArrayRef(), ArrayVal);
    yield* waitFor(2);
    console.log(ArrayVal);
})

function* shellSort(Array: Array, ArrayVal: number[]){
    let n = ArrayVal.length;
    for(let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)){
        for(let i = gap; i < n; i++){
            //  let temp = ArrayVal[i]
            let temp = Array.boxArray[i];
            let tempPos = Array.boxArray[i].position();
            // let tempVal = Array.values()[i];
            let tempVal = ArrayVal[i]
            let j = i;
            yield* all(
                Array.HighLight(j, 1, new Color(Colors.blue)),
                Array.HighLight(j-gap, 1, new Color(Colors.blue)),
            )
            for(j = i; j >= gap && ArrayVal[j - gap] > ArrayVal[i]; j -= gap){
                // ArrayVal[j] = ArrayVal[j - gap]
                yield Array.boxArray[j].position(Array.boxArray[j-gap].position(), 1) 
                Array.boxArray[j] = Array.boxArray[j-gap];
                // Array.values()[j] = Array.values()[j-gap];
                ArrayVal[j] = ArrayVal[j-gap]
            }
            // ArrayVal[j] = temp;
            yield* Array.boxArray[j].position(tempPos, 1);
            yield* all(
                Array.deHighLight(j, 1, new Color(Colors.blue)),
                Array.deHighLight(j+gap, 1, new Color(Colors.blue))
            )
            Array.boxArray[j] = temp;
            // Array.values()[j] = tempVal;
            ArrayVal[j] = tempVal;
        }
    }
}
