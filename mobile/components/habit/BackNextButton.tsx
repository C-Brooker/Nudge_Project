import { StyleSheet, View } from "react-native";
import ActionButton from "../ActionButton";

interface Actions {
  onBack: () => void;
  onNext: () => void;
}
export default function BackNextButtons({ onBack, onNext }: Actions) {
  return (
    <View style={styles.container}>
      <ActionButton name="arrow-left" onPress={onBack} />
      <ActionButton name="arrow-right" onPress={onNext} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
