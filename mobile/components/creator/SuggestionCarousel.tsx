import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/suggestions";
import { useCreatorStore } from "@/stores/useCreatorStore";

interface habitType {
  habitType: string[];
  name: string;
  onPress: () => void;
}

export default function SuggestionCarousel({
  habitType,
  name,
  onPress,
}: habitType) {
  const setName = useCreatorStore((state) => state.setName);
  const setColor = useCreatorStore((state) => state.setColor);

  const next = (name: string, randomColor: string) => {
    setName(name);
    setColor(randomColor);
    onPress();
  };

  return (
    <View style={styles.toolbarRow}>
      <Text style={styles.category}>{name}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {habitType.map((h) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <TouchableOpacity
              key={h}
              style={[styles.filterButton, { backgroundColor: randomColor }]}
              onPress={() => next(h, randomColor)}
            >
              <Text style={[styles.filterLabel]}>{h}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  category: { fontWeight: "bold", width: 60, borderRightWidth: 0.5 },
  filterScroll: {
    paddingLeft: 8,
    paddingRight: 12,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: "#111827",
  },
  filterLabel: {
    fontSize: 14,
    color: "#111827",
  },
  activeFilterLabel: {
    color: "white",
  },
});
