import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { waitFor } from '@motion-canvas/core/lib/flow';
import { Color } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Array } from '../../components/ArrayComponent/Array'
import { Graph } from '../../components/graph-component/graph-component'

export default makeScene2D(function* (view) {
    const graph = createRef<Graph>();

    view.add(
        <Graph 
            ref={graph}
            nodes={[[1,1], [100,100], [100,200]]}
            connections={[[0, 1], [1, 2]]}
        />
    )

    yield* graph().highlightNode(0, new Color("blue"), 1)
    yield* graph().highlightNode(1, new Color("blue"), 1)
    yield* graph().highlightConnection(0, new Color("green"), 1)

    yield* waitFor(5)
})

