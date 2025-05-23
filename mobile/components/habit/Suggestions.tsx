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

export default function Suggestions() {
  return (
    <View>
      <SuggestionCarousel habitType={fitness} name="Fitness" />
      <SuggestionCarousel habitType={health} name="Health" />
      <SuggestionCarousel habitType={mind} name="Mind" />
      <SuggestionCarousel habitType={chores} name="Chores" />
      <SuggestionCarousel habitType={reduce} name="Reduce" />
      <SuggestionCarousel habitType={quit} name="Quit" />
    </View>
  );
}
