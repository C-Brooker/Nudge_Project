import BackNextButtons from "@/components/creator/BackNextButton";
import Layout from "@/components/Layout";
import { useCreatorStore } from "@/stores/useCreatorStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

export default function Color() {
  const name = useCreatorStore((state) => state.name);
  const color = useCreatorStore((state) => state.color);
  const setColor = useCreatorStore((state) => state.setColor);
  const [selectedColor, setSelectedColor] = useState(color);

  const next = () => {
    setColor(selectedColor);
    router.navigate("/(app)/(tabs)/habit/goal");
  };

  const back = () => {
    router.navigate("/(app)/(tabs)/habit/name");
  };

  return (
    <Layout style={[{ backgroundColor: selectedColor }]} name={name ?? "Habit"}>
      <Text style={styles.textStyle}>Select a Colour for your habit</Text>
      <View style={styles.mainContent}>
        <ColorPicker
          color={selectedColor}
          swatches={false}
          sliderHidden={true}
          onColorChange={(color: string) => setSelectedColor(color)}
        />
      </View>
      <BackNextButtons onBack={back} onNext={next} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 40,
  },
});
