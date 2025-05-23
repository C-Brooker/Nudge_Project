import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { StyleProp, ViewStyle } from "react-native";

interface LayoutProps {
  name: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Layout({ name, children, style }: LayoutProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.heading, style]}>
        <Text style={styles.headingText}>{name}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
    width: "100%",
    height: 110,
    borderBottomWidth: 0.2,
    borderColor: "grey",
  },
  headingText: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 32,
  },
  content: {
    flex: 1,
  },
});
