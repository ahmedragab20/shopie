export const paseJson = (json: string) => {
  if (!json) return null;
  if (typeof json !== "string") return null;

  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};
