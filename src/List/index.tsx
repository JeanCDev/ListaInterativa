import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { styles } from "./styles";
import { DraggableCard } from "../DraggableCard";
import { HEIGHT, MARGIN_BOTTOM } from "../Card/styles";

const cards = [
  {id: 1, title: "Teste"},
  {id: 2, title: "Teste"},
  {id: 3, title: "Teste"},
  {id: 4, title: "Teste"},
  {id: 5, title: "Teste"},
  {id: 6, title: "Teste"},
  {id: 7, title: "Teste"},
  {id: 8, title: "Teste"},
  {id: 9, title: "Teste"},
  {id: 10, title: "Teste"},
  {id: 11, title: "Teste"},
  {id: 12, title: "Teste"},
  {id: 13, title: "Teste"},
  {id: 14, title: "Teste"},
]

const listToObject = (list: typeof cards) => {
  const listOfCards = Object.values(list);
  const object: any = {};

  listOfCards.forEach((card, index) => {
    object[card.id] = index;


  });

  return object;
};

export const List: React.FC = () => {
  const scrollY = useSharedValue(0);
  const cardsPosition = useSharedValue(listToObject(cards));

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const renderCards = () => {
    return cards.map(item => (
      <DraggableCard
        data={item}
        key={item.id}
        scrollY={scrollY}
        cardsCount={cards.length}
        cardsPosition={cardsPosition}
      />
    ));
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{height: cards.length * (HEIGHT + MARGIN_BOTTOM)}}
      >
        {renderCards()}
      </Animated.ScrollView>
    </View>
  );
}