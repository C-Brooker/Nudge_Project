import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].background,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="checkbox.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="book.pages.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gemini"
        options={{
          title: "Buddy",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="smiley.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="userprofile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="entry"
        options={{
          title: "Entries",
          href: null,
        }}
      />
    </Tabs>
  );
}
