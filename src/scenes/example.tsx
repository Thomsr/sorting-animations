import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef, range, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../styles/styles';
import { Array } from '../components/ArrayComponent/Array';

const ArrayVal = [6, 7, 8, 8, 2];

export default makeScene2D(function* (view) {
  const ArrayRef = createRef<Array>();

  view.add(
    <Array
      ref={ArrayRef}
      values={ArrayVal}
    />
  )

  yield* mergeSort(ArrayRef(), 0, 4);
  console.log(ArrayVal);


  yield* waitFor(5);
});

function* Merge(Array: Array, Left: number, Mid: number, Right: number){
  // Sub Array 1
  let leftArray = Array.values().slice(Left, Left+Mid-Left+1);
  // Sub Array 2
  let rightArray = Array.values().slice(Mid+1, Mid+1+Right-Mid);

  const Offset = 50;

  yield* all(
    sequence(
      1,
      yield* Array.boxArray.slice(Left, Left+Mid-Left+1).map(i => i.position.y(i.position.y() - Offset, 1)),
      yield* range(Left, Left+Mid-Left+1).map(i => Array.HighLight(i, .5, new Color(Colors.blue))),
    ),
    sequence(
      1,
      yield* Array.boxArray.slice(Mid+1, Mid+1+Right-Mid).map(i => i.position.y(i.position.y() + Offset, 1)),
      yield* range(Mid+1, Mid+1+Right-Mid).map(i => Array.HighLight(i, .5, new Color(Colors.orange))),
    )
  )

  let indexOfSubArray1 = 0,
      indexOfSubArray2 = 0,
      indexOfMergedArray = Left;
      
  while(indexOfSubArray1 < (Mid-Left+1) && indexOfSubArray2 < (Right-Mid)){
    if(leftArray[indexOfSubArray1] <= rightArray[indexOfSubArray2]){
      Array.values()[indexOfMergedArray] = leftArray[indexOfSubArray1];
      yield* Array.Swap(indexOfMergedArray, Left+indexOfSubArray1, true, 1);
      indexOfSubArray1++;
    } else {
      Array.values()[indexOfMergedArray] = rightArray[indexOfSubArray2];
      yield* Array.Swap(indexOfMergedArray, Mid+1+indexOfSubArray2, true, 1);
      indexOfSubArray2++;
    }
    indexOfMergedArray++;
  }

  while(indexOfSubArray1 < (Mid-Left+1)){
    Array.values()[indexOfMergedArray] = leftArray[indexOfSubArray1];
    yield* Array.Swap(indexOfMergedArray, Left+indexOfSubArray1, true, 1);
    indexOfSubArray1++;
    indexOfMergedArray++;
  }

  while(indexOfSubArray1 < (Right-Mid)){
    Array.values() [indexOfMergedArray] = rightArray[indexOfSubArray2];
    yield* Array.Swap(indexOfMergedArray, Mid+1+indexOfSubArray2, true, 1);
    indexOfSubArray2++;
    indexOfMergedArray++;
  }

  yield* all(
    sequence(
      1,
      // yield* Array.boxArray.slice(Left, Left+Mid-Left+1).map(i => i.position.y(i.position.y() + Offset, 1)),
      yield* range(Left, Left+Mid-Left+1).map(i => Array.deHighLight(i, .5, new Color(Colors.blue))),
    ),
    sequence(
      1,
      // yield* Array.boxArray.slice(Left, Left+Mid-Left+1).map(i => i.position.y(i.position.y() - Offset, 1)),
      yield* range(Mid+1, Mid+1+Right-Mid).map(i => Array.deHighLight(i, .5, new Color(Colors.orange))),
    )
  )
}

function* mergeSort(Array: Array, Begin: number, End: number){
  if(Begin >= End)
    return;
  
    let Mid = Begin + Math.floor((End - Begin) / 2);
    yield* mergeSort(Array, Begin, Mid);
    yield* mergeSort(Array, Mid+1, End);
    yield* Merge(Array, Begin, Mid, End);
}
