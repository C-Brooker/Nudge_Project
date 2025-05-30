import { useAuthStore } from "@/stores/useAuthStore";
import { CountGoal, QuitGoal, useHabitStore } from "@/stores/useHabitStore";

interface HabitData {
  name: string;
  color: string;
  goal: CountGoal | QuitGoal;
  difficulty: 0 | 1 | 2 | 3 | 4;
}

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createHabit = async (data: HabitData) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_APP_URL + "/habits", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create habit");

    const habit = await response.json();
    console.log("Habit created successfully:", habit);

    useHabitStore.getState().addHabit(habit);

    return habit;
  } catch (error: any) {
    console.log("Error creating habit:", error.message);
    throw error;
  }
};

export const getAllHabits = async () => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_APP_URL + "/habits", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch habits");

    const habits = await response.json();

    useHabitStore.getState().setHabits(habits);

    return habits;
  } catch (error: any) {
    console.log("Error fetching habits:", error.message);
    throw error;
  }
};

export const getHabitById = async (id: number) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/habits/${id}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch habit");

    return response.json();
  } catch (error: any) {
    console.log("Error fetching habit:", error.message);
    throw error;
  }
};

export const updateHabit = async (id: number, data: HabitData) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/habits/${id}`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update habit");

    const updatedHabit = await response.json();

    // Update local store
    useHabitStore.getState().updateHabit(id, updatedHabit);

    return updatedHabit;
  } catch (error: any) {
    console.log("Error updating habit:", error.message);
    throw error;
  }
};

export const deleteHabit = async (id: number) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/habits/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to delete habit");

    useHabitStore.getState().removeHabit(id);

    console.log("Habit deleted successfully");
  } catch (error: any) {
    console.log("Error deleting habit:", error.message);
    throw error;
  }
};

export const markHabitComplete = async (id: number, date?: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/habits/${id}/complete`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ date }),
      }
    );

    if (!response.ok) throw new Error("Failed to mark habit complete");

    const updatedHabit = await response.json();

    useHabitStore.getState().markHabitComplete(id, date);

    return updatedHabit;
  } catch (error: any) {
    console.log("Error marking habit complete:", error.message);
    throw error;
  }
};

export const markHabitIncomplete = async (id: number, date?: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/habits/${id}/incomplete`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ date }),
      }
    );

    if (!response.ok) throw new Error("Failed to mark habit incomplete");

    const updatedHabit = await response.json();

    useHabitStore.getState().markHabitIncomplete(id, date);

    return updatedHabit;
  } catch (error: any) {
    console.log("Error marking habit incomplete:", error.message);
    throw error;
  }
};

export const clearAllHabits = async () => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_APP_URL + "/habits", {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to clear all habits");

    useHabitStore.getState().clearAllHabits();

    console.log("All habits cleared successfully");
  } catch (error: any) {
    console.log("Error clearing all habits:", error.message);
    throw error;
  }
};
