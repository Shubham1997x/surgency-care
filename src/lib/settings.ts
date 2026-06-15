export interface ImageSetting {
  aspectRatio: string; // e.g. "aspect-square", "aspect-video", "aspect-[3/4]", "aspect-[4/3]"
  objectFit: string; // e.g. "object-cover", "object-contain"
}

export interface ImageSettings {
  doctor: ImageSetting;
  hospital: ImageSetting;
  treatment: ImageSetting;
}

const defaultSettings: ImageSettings = {
  doctor: { aspectRatio: "aspect-square", objectFit: "object-cover" },
  hospital: { aspectRatio: "aspect-video", objectFit: "object-cover" },
  treatment: { aspectRatio: "aspect-video", objectFit: "object-cover" },
};

export function getImageSettings(): ImageSettings {
  if (typeof window !== "undefined") {
    return defaultSettings;
  }

  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/config/image-settings.json");

    if (!fs.existsSync(filePath)) {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaultSettings;
  }
}

export function saveImageSettings(settings: ImageSettings) {
  if (typeof window !== "undefined") return;

  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/config/image-settings.json");

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));
  } catch (e) {
    // Ignore
  }
}

