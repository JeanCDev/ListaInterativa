import React, { useState } from "react";
import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { Card } from "../Card";
import { styles } from "./styles";
import { HEIGHT, MARGIN_BOTTOM } from "../Card/styles";

type DraggableCardDataProps = {
  data: {
    id: number;
    title: string;
  };
  cardsPosition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
}

export const DraggableCard: React.FC<DraggableCardDataProps> = ({
  data,
  scrollY,
  cardsCount,
  cardsPosition,
}) => {
  const [ moving, setMoving ] = useState(false);

  const top = useSharedValue(cardsPosition.value[data.id] * (HEIGHT + MARGIN_BOTTOM));

  const objectMove = (positions: number[], from: number, to: number) => {
    'worklet';
    const newPositions = Object.assign({}, positions);

    for (const id in positions) {
      if (positions[id] === from) {
        newPositions[id] = to;
      }

      if (positions[id] === to) {
        newPositions[id] = from;
      }
    }

    return newPositions;
  };

  useAnimatedReaction(() => cardsPosition.value[data.id], (currentPosition, previousPosition) => {
    if (currentPosition !== previousPosition) {
      if (!moving) {
        top.value = withSpring(currentPosition * (HEIGHT + MARGIN_BOTTOM));
      }
    }
  }, [moving]);

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex: moving ? 1 : 0,
    top: top.value - (HEIGHT + MARGIN_BOTTOM),
    opacity: withSpring(moving ? .4 : 1)
  }), [moving]);

  const longPressGesture = Gesture.LongPress().onStart(() => {
    runOnJS(setMoving)(true);
  }).minDuration(200);

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
      if (moving) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((event) => {
      top.value = (event.absoluteY + scrollY.value);

      const startPositionList = 0;
      const endPositionList = cardsCount - 1;
      const currentPosition = Math.floor(event.absoluteY / (HEIGHT + MARGIN_BOTTOM));

      'worklet';
      const newPosition = Math.max(startPositionList, Math.min(currentPosition, endPositionList));

      if (newPosition !== cardsPosition.value[data.id]) {
        cardsPosition.value = objectMove(cardsPosition.value, cardsPosition.value[data.id], newPosition);
      }
    })
    .onFinalize(() => {
      const newPosition = cardsPosition.value[data.id] * (HEIGHT + MARGIN_BOTTOM);

      top.value = withSpring(newPosition);
      runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
        <Card
          data={data}
        />
      </GestureDetector>
    </Animated.View>
  );
}