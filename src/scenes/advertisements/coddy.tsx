import { makeScene2D } from "@motion-canvas/2d";
import { Txt } from "@motion-canvas/2d/lib/components";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { slideTransition } from "@motion-canvas/core/lib/transitions";
import { Direction } from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view){
    yield* slideTransition(Direction.Top, .5)
    
    view.add(
        <>
        <Txt 
            textAlign={"center"}
            text={"Want to learn how to code? \n Then check out Coddy at coddy.tech \n and use code Thomsr for 20% off"}

        />
        </>
    )
    yield* waitFor(5)
})