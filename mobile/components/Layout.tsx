import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface LayoutProps {
  name: string;
  children?: ReactNode;
}

export default function Layout({ name, children }: LayoutProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 32,
  },
});
