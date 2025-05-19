import { logoutUser } from "@/apis";
import AchievementsList from "@/components/game/Achievements";
import Layout from "@/components/Layout";
import { useAchievementStore } from "@/stores/useAchievementStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from "react-native";

export default function ProfileAuthScreen() {
  const { username, experience, level, coins } = useProfileStore();
  const { unlockedKeys } = useAchievementStore();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
    } catch (error: any) {
      console.log("Error: " + error);
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Layout name="Profile">
      <View style={styles.imageWrap}>
        <Image
          source={require("../../../assets/images/avatar-placeholder.png")}
          style={styles.image}
        />
        <Text style={styles.textBold}>Username: {username}</Text>
        <Text style={styles.textBold}>Experience: {experience}</Text>
        <Text style={styles.textBold}>Level: {level}</Text>
        <Text style={styles.textBold}>Coins: {coins}</Text>
        <AchievementsList unlockedKeys={unlockedKeys} />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <View style={styles.switches}>
        <Text style={styles.textBold}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  textBold: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginHorizontal: 12,
    lineHeight: 22,
    fontWeight: "bold",
  },
  textCenter: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    marginHorizontal: 12,
    lineHeight: 22,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#111827",
    marginBottom: 12,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switches: {
    display: "flex",
  },
});
