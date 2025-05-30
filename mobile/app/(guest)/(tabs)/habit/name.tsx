import BackNextButtons from "@/components/creator/BackNextButton";
import Layout from "@/components/Layout";
import { useCreatorStore } from "@/stores/useCreatorStore";
import React, { useRef, useState } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";
import Suggestions from "@/components/creator/Suggestions";
import { router } from "expo-router";

export default function Name() {
  const name = useCreatorStore((state) => state.name);
  const color = useCreatorStore((state) => state.color);
  const setName = useCreatorStore((state) => state.setName);
  const clearCreator = useCreatorStore((state) => state.clearCreator);
  const inputRef = useRef("");

  const updateText = (text: string) => {
    inputRef.current = text;
  };

  const next = () => {
    const input = inputRef.current || "";
    if (input.trim()) {
      setName(input.trim());
      router.navigate("/(guest)/(tabs)/habit/color");
    }

    if (name) {
      router.navigate("/(guest)/(tabs)/habit/color");
    }
  };

  const back = () => {
    clearCreator();
    router.navigate("/(guest)/(tabs)/habits");
  };

  return (
    <Layout style={[{ backgroundColor: color }]} name={name ?? "Habit"}>
      <Text style={styles.textStyle}>Select a Name for your habit</Text>
      <View style={styles.mainContent}>
        <View style={styles.subContent}>
          <TextInput
            editable
            maxLength={20}
            placeholder="Habit Name"
            style={styles.textInput}
            onChangeText={updateText}
          />
          <Text style={styles.subTextStyle}>Or</Text>
        </View>
        <Text style={styles.subTextStyle}>Pick from some Suggested Habits</Text>
        <Suggestions type="(guest)" />
      </View>
      <BackNextButtons onBack={back} onNext={next} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  subContent: {
    marginBottom: 40,
  },
  subTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 15,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 40,
  },
  textInput: {
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 200,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
});
