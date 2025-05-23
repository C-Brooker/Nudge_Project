import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@/components/Layout";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useEntryStore } from "@/stores/useEntryStore";
import { useRouter } from "expo-router";
import EntryModal from "@/components/entry/EntryModal";

export default function EntryScreen() {
  const router = useRouter();
  const richRef = useRef<RichEditor>(null);
  const store = useEntryStore();
  const [content, setContent] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  //Save to store, clear editor, route to journal page
  const handleSave = (habit: string | null, color: string) => {
    if (!content.trim()) return;
    store.addEntry(content, habit, color);
    setContent("");
    richRef.current?.setContentHTML("");
    router.replace("/(app)/(tabs)/journal");
  };

  // Date header
  const date = new Date();
  const dateStr = date.toLocaleDateString("en-GB");
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Layout name="New Entry">
      <EntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(habit: string | null, color: string) =>
          handleSave(habit, color)
        }
        name="Journal Entry"
      />
      <KeyboardAvoidingView style={styles.full}>
        <View style={styles.toolbarRow}>
          <RichToolbar
            editor={richRef}
            actions={[
              actions.heading1,
              "paragraph",
              actions.setBold,
              actions.indent,
              actions.outdent,
              actions.setUnderline,
              actions.setItalic,
              actions.insertBulletsList,
              actions.checkboxList,
            ]}
            iconTint="#E5E5E5"
            selectedIconTint="#111827"
            iconSize={26}
            iconMap={{
              [actions.heading1]: ({ tintColor }: any) => (
                <MaterialIcons name="title" size={26} color={tintColor} />
              ),
              paragraph: ({ tintColor }: any) => (
                <MaterialIcons name="text-fields" size={26} color={tintColor} />
              ),
            }}
            style={styles.richToolbar}
            paragraph={() => {
              richRef.current?.commandDOM(
                `document.execCommand('formatBlock', false, 'P')`
              );
            }}
          />
        </View>

        <Text style={styles.dateText}>{`${dateStr} ${timeStr}`}</Text>

        <RichEditor
          ref={richRef}
          placeholder="Start writing…"
          style={styles.editor}
          initialHeight={300}
          onChange={setContent}
        />

        {/* Undo, Redo - Need custom undo/redo so that keyboard doesnt popup  and Save */}
        <View style={styles.bottonRow}>
          <RichToolbar
            editor={richRef}
            actions={["undoNF", "redoNF"]}
            iconTint="#111827"
            iconSize={26}
            style={styles.richToolbar}
            iconMap={{
              undoNF: ({ tintColor }: any) => (
                <MaterialIcons name="undo" size={30} color={tintColor} />
              ),
              redoNF: ({ tintColor }: any) => (
                <MaterialIcons name="redo" size={30} color={tintColor} />
              ),
            }}
            undoNF={() => {
              richRef.current?.commandDOM(`document.execCommand('undo')`);
              richRef.current?.blurContentEditor();
            }}
            redoNF={() => {
              richRef.current?.commandDOM(`document.execCommand('redo')`);
              richRef.current?.blurContentEditor();
            }}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.saveBtn}
          >
            <MaterialIcons name="save" size={30} color="#4b5563" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

/* ───────── styles ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  full: { height: "90%", width: "100%" },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  richToolbar: { backgroundColor: "transparent" },
  saveBtn: { padding: 6, borderRadius: 8 },
  dateText: {
    textAlign: "center",
    fontSize: 13,
    color: "#4b5563",
    marginVertical: 6,
  },
  editor: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
  },
  bottonRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
