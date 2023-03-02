import { makeScene2D } from "@motion-canvas/2d";
import { all, any, sequence, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";
import { Array } from "../..//components/ArrayComponent/Array";
import { Colors } from "@/styles/styles"
import { createRef, useLogger } from "@motion-canvas/core/lib/utils";
import { Color, Direction, Spacing, Vector2 } from "@motion-canvas/core/lib/types";
import { Image, Node, Rect, Text } from "@motion-canvas/2d/lib/components";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";
import swapIcon from "../../../images/icons/swap Icon.png"
import minIcon from "../../../images/icons/min Icon.png"
import expandIcon from "../../../images/icons/expand Icon.png"
import swapIconblue from "../../../images/icons/swap Icon blue.png"
import minIconblue from "../../../images/icons/min Icon blue.png"
import expandIconblue from "../../../images/icons/expand Icon blue.png"
import { create } from "domain";
import { slideTransition } from "@motion-canvas/core/lib/transitions";
import { easeInOutCubic, tween } from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {
    yield* slideTransition(Direction.Bottom, 1);
    const Example = createRef<Text>();
    const textStyle = {
        paddingTop: 10,
        fontFamily: 'JetBrains Mono',
        fill: 'rgba(255, 255, 255, 0.6)',
      };

    const ArrayValues = [4, 2, 3, 6, 2];
    const BoxWidth = createSignal(1);

    view.add(
        <Text
            ref={Example}
            text={"EXAMPLE"}
            opacity={0}
            fontSize={100}
            lineHeight={100}
            {...textStyle}
        />
    )

    yield* Example().opacity(1, .5)
    yield* waitFor(.7);
    yield* Example().opacity(0, .5)

    const ArrayVal = [9, 7, 2, 4, 1]
    const ArrayRef = createRef<Array>();

    const smallest = createSignal(0);

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
            // opacity={0}
        />
        </>
    )

    for(let i = 0; i < ArrayVal.length; i++)
        ArrayRef().boxArray[i].opacity(0);

    for(let i = 0; i < ArrayValues.length; i++){
        ArrayRef().boxArray[i].position.y(-50);
        yield* all(
            tween(.5, y => {
                ArrayRef().boxArray[i].position(
                    Vector2.lerp(
                        new Vector2(ArrayRef().boxArray[i].position.x(), ArrayRef().boxArray[i].position.y()),
                        new Vector2(ArrayRef().boxArray[i].position.x(), 0),
                        easeInOutCubic(y),
                    )
                )
            }),
            ArrayRef().boxArray[i].opacity(1, .5),
        )
    }

    yield* waitUntil('9')
    yield* ArrayRef().HighLight(0, 1, new Color(Colors.blue))

    yield* waitUntil('compare')
    yield* ArrayRef().HighLight(1, 1, new Color(Colors.blue))

    yield* waitUntil('change')
    yield* ArrayRef().HighLight(0, 1, new Color(Colors.surface))

    yield* waitUntil('2')
    yield* ArrayRef().HighLight(2, 1, new Color(Colors.blue))

    yield* waitUntil('change2')
    yield* ArrayRef().HighLight(1, 1, new Color(Colors.surface))

    yield* waitUntil('Compare2')
    yield* ArrayRef().HighLight(3, 1, new Color(Colors.blue))

    yield* waitUntil('Nochange')
    yield* ArrayRef().HighLight(3, 1, new Color(Colors.surface))

    yield* waitUntil('Compare3')
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.blue))

    yield* waitUntil('Change')
    yield* ArrayRef().HighLight(2, 1, new Color(Colors.surface))

    yield* waitUntil('Swap')
    yield* ArrayRef().Swap(4, 0, false, 1)

    yield* waitUntil('mark')
    yield* ArrayRef().HighLight(0, 1, new Color(Colors.green))
    yield* smallest(1, 1)

    yield* waitUntil('traverse')
    yield* ArrayRef().HighLight(1, 1, new Color(Colors.blue))
    yield* all(
        ArrayRef().HighLight(1, 1, new Color(Colors.surface)),
        ArrayRef().HighLight(2, 1, new Color(Colors.blue)),
    )
    yield* ArrayRef().HighLight(3, 1, new Color(Colors.blue))
    yield* ArrayRef().HighLight(3, 1, new Color(Colors.surface))
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.blue))
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.surface))

    yield* waitUntil('swap2')
    yield* ArrayRef().Swap(2, 1, false, 1)
    yield* ArrayRef().HighLight(1, 1, new Color(Colors.green))
    yield* smallest(2, 1)

    yield* waitUntil('searching')
    yield* ArrayRef().HighLight(2, 1, new Color(Colors.blue))

    yield* all(
        ArrayRef().HighLight(2, 1, new Color(Colors.surface)),
        ArrayRef().HighLight(3, 1, new Color(Colors.blue)),
    )
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.blue))
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.surface))

    yield* waitUntil('4')
    yield* ArrayRef().Swap(3, 2, false, 1),
    yield* all(
        ArrayRef().HighLight(2, 1, new Color(Colors.green)),
        smallest(3, 1)
    )  
    yield* all(
        ArrayRef().HighLight(3, 1, new Color(Colors.green)),
        smallest(4, 1)
    )  
    yield* ArrayRef().HighLight(4, 1, new Color(Colors.green))


    

    yield* waitUntil('next')
})