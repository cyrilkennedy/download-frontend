// src/lib/storage.js
export const saveVideoData = (data) => {
  try {
    localStorage.setItem("vidfetch_data_start", JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data:", e);
  }
};

export const getVideoData = (key = "vidfetch_data") => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to get data:", e);
    return null;
  }
};

export const clearVideoData = () => {
  try {
    localStorage.removeItem("vidfetch_data_start");
    localStorage.removeItem("vidfetch_data");
    localStorage.removeItem("vidfetch_completed");
  } catch (e) {
    console.error("Failed to clear data:", e);
  }
};
