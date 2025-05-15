import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Reminder {
  id: number;
  name: string;
  description: string;
  time: Date;
}

interface ReminderStore {
  reminders: Reminder[];
  nextId: number;
  addReminder: (reminder: Reminder) => void;
  clearReminders: () => void;
}

export const useReminderStore = create<ReminderStore>()(
  persist(
    (set) => ({
      reminders: [],
      nextId: 1,
      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, { ...reminder, id: state.nextId }],
          nextId: state.nextId + 1,
        })),
      clearReminders: () =>
        set((state) => ({
          reminders: [],
          nextId: 1,
        })),
    }),
    {
      name: "reminders",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
