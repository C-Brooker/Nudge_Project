import { useAuthStore } from "@/stores/useAuthStore";
import { useEntryStore } from "@/stores/useEntryStore";

interface Entry {
  id: number;
  content: string;
  color: string;
  habit: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface CreateEntryData {
  content: string;
  color?: string;
  habit?: string | null;
}

interface UpdateEntryData {
  content?: string;
  color?: string;
  habit?: string | null;
}

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createEntry = async (data: CreateEntryData) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/journal-entries",
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to create journal entry");

    const entry = await response.json();
    console.log("Journal entry created successfully:", entry);

    useEntryStore.getState().addEntry(entry.content, entry.habit, entry.color);

    return entry;
  } catch (error: any) {
    console.log("Error creating journal entry:", error.message);
    throw error;
  }
};

export const getAllEntries = async () => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/journal-entries",
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch journal entries");

    const entries = await response.json();

    useEntryStore.getState().setEntries(entries);

    return entries;
  } catch (error: any) {
    console.log("Error fetching journal entries:", error.message);
    throw error;
  }
};

export const getEntryById = async (id: number) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/journal-entries/${id}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch journal entry");

    return response.json();
  } catch (error: any) {
    console.log("Error fetching journal entry:", error.message);
    throw error;
  }
};

export const updateEntry = async (id: number, data: UpdateEntryData) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/journal-entries/${id}`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update journal entry");

    const updatedEntry = await response.json();

    useEntryStore
      .getState()
      .editEntry(
        id,
        updatedEntry.content,
        updatedEntry.habit,
        updatedEntry.color
      );

    return updatedEntry;
  } catch (error: any) {
    console.log("Error updating journal entry:", error.message);
    throw error;
  }
};

export const deleteEntry = async (id: number) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + `/journal-entries/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to delete journal entry");

    useEntryStore.getState().removeEntry(id);

    console.log("Journal entry deleted successfully");
  } catch (error: any) {
    console.log("Error deleting journal entry:", error.message);
    throw error;
  }
};

export const clearAllEntries = async () => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_APP_URL + "/journal-entries",
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Failed to clear all journal entries");

    useEntryStore.getState().clearEntries();

    console.log("All journal entries cleared successfully");
  } catch (error: any) {
    console.log("Error clearing all journal entries:", error.message);
    throw error;
  }
};
