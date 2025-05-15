export interface MessageDto {
  id: number;
  role: "user" | "model";
  content: string;
  createdAt: string;
}

const API_URL = process.env.EXPO_PUBLIC_APP_URL;

//Fetchs Chat history, if it exists, from db
export async function fetchHistory(userId: number): Promise<MessageDto[]> {
  const res = await fetch(`${API_URL}/gemini/history?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch history");
  const data: MessageDto[] = await res.json();
  return data.reverse();
}

//Sends Users Message to gemini api
export async function sendMessage(
  userId: number,
  message: string
): Promise<string> {
  const res = await fetch(`${API_URL}/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  const data = await res.json();
  return data.message as string;
}

//Removes Users Chat History from db
export async function clearHistory(userId: number): Promise<void> {
  console.log(userId);
  const res = await fetch(`${API_URL}/gemini/history?userId=${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to clear history");
}
