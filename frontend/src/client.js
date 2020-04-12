import { baseUrl } from "./config.json";

export const regenerateSession = async () => {
  // intentionally called two times, there is some problem with express-session
  await fetch(`${baseUrl}/regenerate-session`, {
    method: "POST",
    credentials: "include",
  });
  await fetch(`${baseUrl}/regenerate-session`, {
    method: "POST",
    credentials: "include",
  });
};
