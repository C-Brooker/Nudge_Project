import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Layout from "@/components/Layout";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { Picker } from "@react-native-picker/picker";

export default function JournalEntryScreen() {
  const richRef = useRef<RichEditor>(null);
  const [fontSize, setFontSize] = useState<number>(16);

  /* placeholder save */
  const handleSave = async () => {
    //const html = await richRef.current?.getContentHtml();
    //console.log("Saving entry:", html);
  };

  // Date header
  const date = new Date();
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* Inject CSS to control the current font size */
  const editorStyle = {
    contentCSSText: `font-size: ${fontSize}px;`,
  } as const;

  return (
    <Layout name="New Entry">
      <KeyboardAvoidingView
        style={styles.full}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ─── Toolbar (custom) ─────────────────────────────── */}
        <View style={styles.toolbarRow}>
          {/* Font‑size picker */}
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={fontSize}
              onValueChange={(v) => setFontSize(v)}
              mode="dropdown"
              style={Platform.OS === "ios" ? undefined : styles.pickerAndroid}
            >
              {[8, 10, 11, 12, 15, 20].map((s) => (
                <Picker.Item key={s} label={`${s}`} value={s} />
              ))}
            </Picker>
          </View>

          {/* Bold / Underline / Italic via RichToolbar */}
          <RichToolbar
            editor={richRef}
            actions={[actions.setBold, actions.setUnderline, actions.setItalic]}
            iconTint="#4b5563"
            selectedIconTint="#111827"
            iconSize={24}
            style={styles.richToolbar}
          />

          {/* Save */}
          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Ionicons name="save" size={24} color="#4b5563" />
          </TouchableOpacity>
        </View>

        {/* date */}
        <Text style={styles.dateText}>{`${dateStr} ${timeStr}`}</Text>

        {/* ─── Rich Editor ──────────────────────────────────── */}
        <RichEditor
          ref={richRef}
          editorStyle={editorStyle}
          placeholder="Start writing…"
          style={styles.editor}
          initialHeight={300}
        />
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
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },
  pickerAndroid: { width: 80, height: 36 },
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
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
  },
  spacer: { flex: 1 },
});
