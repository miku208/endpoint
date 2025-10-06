import { database } from "./firebase";
import {
  ref,
  push,
  runTransaction,
  query,
  orderByChild,
  limitToLast,
  get,
  remove,
} from "firebase/database";

export const logRequest = async (req, status, responseTime) => {
  try {
    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const time = wibDate.toISOString().replace("T", " ").slice(0, 19);

    const log = {
      id: Date.now(),
      method: req.method,
      url: req.url,
      status,
      time,
      responseTime,
    };

    await push(ref(database, "recentRequests"), log);

    await runTransaction(ref(database, "stats/totalRequests"), (current) => {
      return (current || 0) + 1;
    });

    const logsRef = query(
      ref(database, "recentRequests"),
      orderByChild("id"),
      limitToLast(6)
    );
    const snapshot = await get(logsRef);
    if (snapshot.exists()) {
      const entries = Object.entries(snapshot.val());
      if (entries.length > 5) {
        const oldestKey = entries[0][0];
        await remove(ref(database, `recentRequests/${oldestKey}`));
      }
    }
  } catch (err) {
    console.error("Failed to log request:", err);
  }
};
