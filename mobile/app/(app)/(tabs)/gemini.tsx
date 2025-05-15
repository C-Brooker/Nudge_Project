import {
  fetchHistory,
  sendMessage,
  clearHistory,
  MessageDto,
} from "@/apis/gemini";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";

const USER_ID = 1;

export default function ChatScreen() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  // ───────────────────────────────────────────── Fetch history on mount
  useEffect(() => {
    (async () => {
      try {
        const history = await fetchHistory(USER_ID);
        setMessages(history);
        setTimeout(scrollToEnd, 50);
      } catch (e) {
        console.warn("History fetch failed", e);
      }
    })();
  }, []);

  // ───────────────────────────────────────────── Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userContent = input.trim();

    const userMsg: MessageDto = {
      id: Date.now(),
      role: "user",
      content: userContent,
      createdAt: new Date().toISOString(),
    } as MessageDto;
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    scrollToEnd();

    setLoading(true);
    try {
      const replyText = await sendMessage(USER_ID, userContent);
      const assistantMsg: MessageDto = {
        id: Date.now() + 1,
        role: "model",
        content: replyText,
        createdAt: new Date().toISOString(),
      } as MessageDto;
      setMessages((prev) => [...prev, assistantMsg]);
      scrollToEnd();
    } catch (e) {
      console.warn("Send failed", e);
    } finally {
      setLoading(false);
    }
  };

  //Clearing Chat
  const handleClear = async () => {
    setLoading(true);
    try {
      await clearHistory(USER_ID);
      setMessages([]);
    } catch (e) {
      console.warn("Clear failed", e);
    } finally {
      setLoading(false);
    }
  };

  const scrollToEnd = () => {
    listRef.current?.scrollToEnd({ animated: true });
  };

  //Adding Message to view
  const renderItem = ({ item }: { item: MessageDto }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.row,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.assistantBubble,
          ]}
        >
          <Markdown
            style={{ body: isUser ? styles.userText : styles.assistantText }}
          >
            {item.content}
          </Markdown>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Habit Buddy</Text>
        <TouchableOpacity
          onPress={handleClear}
          disabled={loading}
          style={styles.clearBtn}
          accessibilityLabel="Clear chat history"
        >
          <Text style={styles.clearText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      {/* Messages list */}
      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={scrollToEnd}
      />

      {/* Input  */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
          multiline
          editable={!loading}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={loading || !input.trim()}
          style={[
            styles.sendBtn,
            (loading || !input.trim()) && styles.sendBtnDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.sendText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ───────────────────────────────────────────── Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ffeaea",
  },
  clearText: { color: "red", fontWeight: "bold" },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: { backgroundColor: "#2563eb" },
  assistantBubble: { backgroundColor: "#e5e7eb" },
  userText: { color: "#fff", fontSize: 16, lineHeight: 20 },
  assistantText: { color: "#111827", fontSize: 16, lineHeight: 20 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#2563eb",
  },
  sendBtnDisabled: {
    backgroundColor: "#9ca3af",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
