import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Entry {
  id: number;
  content: string;
  createdAt: string;
}
interface EntryStore {
  entries: Entry[];
  nextId: number;

  addEntry: (content: string) => void;
  removeEntry: (id: number) => void;
  editEntry: (id: number, newContent: string) => void;
  clearEntries: () => void;
}

export const useEntryStore = create<EntryStore>()(
  persist(
    (set) => ({
      entries: [],
      nextId: 1,

      addEntry: (content: string) =>
        set((state) => ({
          entries: [
            ...state.entries,
            { id: state.nextId, content, createdAt: new Date().toISOString() },
          ],
          nextId: state.nextId + 1,
        })),

      removeEntry: (id: number) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      editEntry: (id: number, newContent: string) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  content: newContent,
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
