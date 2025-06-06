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
        name="habits"
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
        name="guestprofile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="person.fill" color={color} />
          ),
        }}
      />

      {/*Hiding entry helper screens*/}
      <Tabs.Screen
        name="entry/create"
        options={{ href: null, tabBarItemStyle: null }}
      />
      <Tabs.Screen
        name="entry/[id]"
        options={{ href: null, tabBarItemStyle: null }}
      />

      {/* Hiding Habit helper screens*/}
      <Tabs.Screen
        name="habit/name"
        options={{ href: null, tabBarItemStyle: null }}
      />
      <Tabs.Screen
        name="habit/color"
        options={{ href: null, tabBarItemStyle: null }}
      />
      <Tabs.Screen
        name="habit/goal"
        options={{ href: null, tabBarItemStyle: null }}
      />
    </Tabs>
  );
}
