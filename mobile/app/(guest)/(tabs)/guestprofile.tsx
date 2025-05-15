import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import Layout from "@/components/Layout";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from "react-native";

type Props = {
  onPressSignIn: () => void;
};

export default function ProfileUnauthScreen({ onPressSignIn }: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Layout name="Profile">
      <LoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onRegister={() => {
          setLoginVisible(false);
          setRegisterVisible(true);
        }}
        name="Sign in"
      />
      <RegisterModal
        visible={registerVisible}
        onClose={() => setRegisterVisible(!registerVisible)}
        onLogin={() => {
          setLoginVisible(true);
          setRegisterVisible(false);
        }}
        name="Sign up"
      />

      <View style={styles.imageWrap}>
        <Image
          source={require("../../../assets/images/avatar-placeholder.png")}
          style={styles.image}
        />
        <Text style={styles.textBold}>Logged in as Guest</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => setLoginVisible(!loginVisible)}
      >
        <Text style={styles.primaryText}>Create Account / Log In</Text>
      </TouchableOpacity>
      {/* Message */}
      <Text style={styles.textCenter}>
        Sign in to back up and sync your habits across devices and unlock more
        features
      </Text>

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
