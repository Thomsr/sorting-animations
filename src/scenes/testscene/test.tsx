import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { waitFor } from '@motion-canvas/core/lib/flow';
import { Array } from '../../components/ArrayComponent/Array'

export default makeScene2D(function* (view) {

    view.add(
        <Array 
            values={[1, 5, 2, 2]}
        />
    )

    yield* waitFor(5)
})

