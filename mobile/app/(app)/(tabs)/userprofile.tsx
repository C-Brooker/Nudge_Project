import { logoutUser } from "@/apis/auth";
import AchievementsList from "@/components/profile/Achievements";
import Layout from "@/components/Layout";
import StatCard from "@/components/profile/StatCard";
import { useAchievementStore } from "@/stores/useAchievementStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import XPProgressBar from "@/components/profile/XPProgressBar";

export default function ProfileAuthScreen() {
  const { username, level, coins, streak, habitsCompleted } = useProfileStore();
  const { unlockedKeys } = useAchievementStore();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
    } catch (error: any) {
      console.log("Error: " + error);
    }
  };

  return (
    <Layout name="Profile">
      <View style={styles.imageWrap}>
        <Image
          source={require("../../../assets/images/avatar-placeholder.png")}
          style={styles.image}
        />
        <Text style={styles.textBold}>{username}</Text>
        <View style={styles.statGrid}>
          <StatCard
            name="Total Habits"
            value={habitsCompleted ?? 0}
            icon="auto-awesome"
          />
          <StatCard name="Level" value={level ?? 1} icon="bubble-chart" />
          <StatCard name="Coins" value={coins ?? 0} icon="attach-money" />
          <StatCard
            name="Longest Streak"
            value={streak ?? 0}
            icon="local-fire-department"
          />
        </View>
        <XPProgressBar />
        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogout}>
          <Text style={styles.primaryText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <AchievementsList unlockedKeys={unlockedKeys} />
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
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 10,
    columnGap: 10,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  primaryBtn: {
    marginTop: 10,
    width: 200,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
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
