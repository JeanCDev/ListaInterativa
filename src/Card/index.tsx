import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import { styles } from "./styles";

type CardDataProps = {
  data: {
    id: number;
    title: string;
  }
}

export const Card: React.FC<CardDataProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {data.title}
      </Text>

      <Icon
        name="drag-indicator"
        size={32}
        color="#EEE"
      />
    </View>
  );
}