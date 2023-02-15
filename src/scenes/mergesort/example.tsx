import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, loop, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { Color, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef, range, useLogger } from '@motion-canvas/core/lib/utils';
import { Colors } from '../../styles/styles';
import { Array } from '../../components/ArrayComponent/Array';

const ArrayVal = [6, 7, 8, 8, 2];

export default makeScene2D(function* (view) {
  const ArrayRef = createRef<Array>();

  view.add(
    <Array
      ref={ArrayRef}
      values={ArrayVal}
    />
  )

  // yield* mergeSort(ArrayRef(), 0, 4);
  yield* mergeSortManual(ArrayRef(), 0, 5); 
  console.log(ArrayVal);
  yield* waitFor(5);
});

function* mergeSortManual(Array: Array, Begin: number, End: number){
  // [6 7 8] [8 2]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(Begin, Math.floor(End/2)+1).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(Begin, Math.floor(End/2)+1).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 50, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(Math.floor(End/2)+1, End).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(Math.floor(End/2)+1, End).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 50, 1)),
  )
  yield* waitFor(1);
  // [6 7] [8]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(Begin, 2).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(Begin, 2).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 25, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(2, 3).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(2, 3).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 25, 1)),
  )
  yield* waitFor(1);
  // [6] [7]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(Begin, 1).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(Begin, 1).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 25, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(1, 2).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(1, 2).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 25, 1)),
  )
  yield* waitFor(1);
  // [6 7]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(Begin, 1).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(Begin, 1).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 25, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(1, 2).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(1, 2).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 25, 1)),
  )
  yield* waitFor(1);
  // [6 7 8]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(Begin, 2).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(Begin, 2).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 25, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(2, 3).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(2, 3).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 25, 1)),
  )
  yield* waitFor(1);
  // [8] [2]
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(3, 4).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(3, 4).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - 25, 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(4, 5).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() + 50, 1)),
    yield* range(4, 5).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + 25, 1)),
  )
  yield* waitFor(1);
  yield* all(
    // yield* range(Begin, Math.floor(End/2)+1).map(i => Array.HighLight(i, 1, new Color(Colors.blue))),
    yield* range(3, 4).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(3, 4).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() + (25 + (128+28)), 1)),
    // yield* range(Math.floor(End/2)+1, End).map(i => Array.HighLight(i, 1, new Color(Colors.orange))),
    yield* range(4, 5).map(i => Array.boxArray[i].position.y(Array.boxArray[i].position.y() - 50, 1)),
    yield* range(4, 5).map(i => Array.boxArray[i].position.x(Array.boxArray[i].position.x() - (25 + (128+28)), 1)),
  )
  yield* waitFor(1);
  yield*
}

function* Merge(Array: Array, Left: number, Mid: number, Right: number){
  let leftArray = Array.values().slice(Left, Left+Mid-Left+1);
  let rightArray = Array.values().slice(Mid+1, Mid+1+Right-Mid);

  let indexOfSubArray1 = 0,
      indexOfSubArray2 = 0,
      indexOfMergedArray = Left;
  while(indexOfSubArray1 < (Mid-Left+1) && indexOfSubArray2 < (Right-Mid)){
    if(leftArray[indexOfSubArray1] <= rightArray[indexOfSubArray2]){
      yield* Array.Swap(indexOfMergedArray, Left+indexOfSubArray1, true, 1);
      // Array.values()[indexOfMergedArray] = leftArray[indexOfSubArray1];
      indexOfSubArray1++;
    } else {
      yield* Array.Swap(indexOfMergedArray, Mid+1+indexOfSubArray2, true, 1);
      // Array.values.[indexOfMergedArray] = rightArray[indexOfSubArray2];
      indexOfSubArray2++;
    }
    indexOfMergedArray++;
  }

  while(indexOfSubArray1 < (Mid-Left+1)){
    yield* Array.Swap(indexOfMergedArray, Left+indexOfSubArray1, true, 1);
    // Array.values()[indexOfMergedArray] = leftArray[indexOfSubArray1];
    indexOfSubArray1++;
    indexOfMergedArray++;
  }

  while(indexOfSubArray1 < (Right-Mid)){
    yield* Array.Swap(indexOfMergedArray, Mid+1+indexOfSubArray2, true, 1);
    // Array.values() [indexOfMergedArray] = rightArray[indexOfSubArray2];
    indexOfSubArray2++;
    indexOfMergedArray++;
  }

  // yield* all(
  //   sequence(
  //     1,
  //     // yield* Array.boxArray.slice(Left, Left+Mid-Left+1).map(i => i.position.y(i.position.y() + Offset, 1)),
  //     yield* range(Left, Left+Mid-Left+1).map(i => Array.deHighLight(i, .5, new Color(Colors.blue))),
  //   ),
  //   sequence(
  //     1,
  //     // yield* Array.boxArray.slice(Left, Left+Mid-Left+1).map(i => i.position.y(i.position.y() - Offset, 1)),
  //     yield* range(Mid+1, Mid+1+Right-Mid).map(i => Array.deHighLight(i, .5, new Color(Colors.orange))),
  //   )
  // )
}

function* mergeSort(Array: Array, Begin: number, End: number){
  const Offset = 50;
  if(Begin < End){ 
    // yield* all(
    //   // yield* Array.boxArray.slice(Begin, End).map(i => i.position.y(i.position.y() + Offset, 1)),
    //   yield* range(Begin, End).map(i => Array.deHighLight(i, .5, new Color(Colors.blue))),
    // )
    let Mid = Begin + Math.floor((End - Begin) / 2);
    yield* mergeSort(Array, Begin, Mid);
    yield* mergeSort(Array, Mid+1, End);
    yield* Merge(Array, Begin, Mid, End);
  }
}
