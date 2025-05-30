import { View } from "react-native";
import {
  fitness,
  health,
  mind,
  chores,
  reduce,
  quit,
} from "@/constants/suggestions";
import SuggestionCarousel from "./SuggestionCarousel";
import React from "react";
import { useRouter } from "expo-router";

type SuggestionsProps = { type: "(app)" | "(guest)" };

export default function Suggestions({ type }: SuggestionsProps) {
  const router = useRouter();

  const route = () => {
    router.navigate(`/${type}/(tabs)/habit/color`);
  };
  return (
    <View>
      <SuggestionCarousel
        habitType={fitness}
        onPress={() => route()}
        name="Fitness"
      />
      <SuggestionCarousel
        habitType={health}
        onPress={() => route()}
        name="Health"
      />
      <SuggestionCarousel
        habitType={mind}
        onPress={() => route()}
        name="Mind"
      />
      <SuggestionCarousel
        habitType={chores}
        onPress={() => route()}
        name="Chores"
      />
      <SuggestionCarousel
        habitType={reduce}
        onPress={() => route()}
        name="Reduce"
      />
      <SuggestionCarousel
        habitType={quit}
        onPress={() => route()}
        name="Quit"
      />
    </View>
  );
}
