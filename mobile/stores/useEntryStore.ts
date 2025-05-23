import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Entry {
  id: number;
  content: string;
  color: string;
  habit: string | null;
  createdAt: string;
}
interface EntryStore {
  entries: Entry[];
  nextId: number;

  addEntry: (content: string, habit?: string | null, color?: string) => void;
  getEntry: (id: number) => Entry | null;
  removeEntry: (id: number) => void;
  editEntry: (
    id: number,
    newContent: string,
    newHabit: string | null,
    newColor: string
  ) => void;
  clearEntries: () => void;
}

export const useEntryStore = create<EntryStore>()(
  persist(
    (set, get) => ({
      entries: [],
      nextId: 1,

      addEntry: (
        content: string,
        habit: string | null = null,
        color: string = ""
      ) =>
        set((state) => ({
          entries: [
            ...state.entries,
            {
              id: state.nextId,
              content,
              color,
              habit,
              createdAt: new Date().toISOString(),
            },
          ],
          nextId: state.nextId + 1,
        })),

      getEntry: (id: number) => {
        const entry = get().entries.find((entry) => entry.id === id);
        return entry ?? null;
      },
      removeEntry: (id: number) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      editEntry: (
        id: number,
        newContent: string,
        newHabit: string | null,
        newColor: string
      ) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  content: newContent,
                  habit: newHabit,
                  color: newColor,
                  createdAt: new Date().toISOString(),
                }
              : entry
          ),
        })),

      clearEntries: () =>
        set({
          entries: [],
          nextId: 1,
        }),
    }),
    {
      name: "journal_entries",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
