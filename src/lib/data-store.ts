import fs from "fs";
import path from "path";
import {
  SiteData,
  SiteSettings,
  Edition,
  BlogPost,
  Testimonial,
} from "./types";
import initialData from "@/data/initial-data.json";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DATA_FILE = path.join(DATA_DIR, "site-data.json");
const EDITIONS_DIR = path.join(DATA_DIR, "editions");

// Helper to load editions from their dedicated folders
function loadEditionsFromFolders(): Edition[] {
  const editions: Edition[] = [];
  try {
    if (fs.existsSync(EDITIONS_DIR)) {
      const yearDirs = fs
        .readdirSync(EDITIONS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const year of yearDirs) {
        const editionFilePath = path.join(EDITIONS_DIR, year, "edition.json");
        if (fs.existsSync(editionFilePath)) {
          try {
            const raw = fs.readFileSync(editionFilePath, "utf-8");
            const parsed = JSON.parse(raw);
            editions.push(parsed as Edition);
          } catch (e) {
            console.error(`Error loading edition from ${editionFilePath}:`, e);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading editions directory:", err);
  }

  // Sort descending by year
  editions.sort((a, b) => Number(b.year) - Number(a.year));
  return editions;
}

export function getSiteData(): SiteData {
  try {
    let baseData: SiteData;

    if (!fs.existsSync(DATA_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      baseData = initialData as unknown as SiteData;
      fs.writeFileSync(DATA_FILE, JSON.stringify(baseData, null, 2), "utf-8");
    } else {
      const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
      baseData = JSON.parse(fileContent) as SiteData;
    }

    // Always merge or override with folder-based editions
    const folderEditions = loadEditionsFromFolders();
    if (folderEditions.length > 0) {
      baseData.editions = folderEditions;
    }

    return baseData;
  } catch (err) {
    console.error("Error reading site data, returning initial data:", err);
    return initialData as unknown as SiteData;
  }
}

export function saveSiteData(data: SiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

    // Also persist each edition to its dedicated folder
    if (data.editions && data.editions.length > 0) {
      for (const edition of data.editions) {
        const editionFolder = path.join(EDITIONS_DIR, String(edition.year));
        if (!fs.existsSync(editionFolder)) {
          fs.mkdirSync(editionFolder, { recursive: true });
        }
        const editionFile = path.join(editionFolder, "edition.json");
        fs.writeFileSync(
          editionFile,
          JSON.stringify(edition, null, 2),
          "utf-8",
        );
      }
    }

    return true;
  } catch (err) {
    console.error("Error saving site data:", err);
    return false;
  }
}

export function updateSettings(
  partialSettings: Partial<SiteSettings>,
): SiteData {
  const current = getSiteData();
  const updated = {
    ...current,
    settings: {
      ...current.settings,
      ...partialSettings,
    },
  };
  saveSiteData(updated);
  return updated;
}

export function upsertEdition(edition: Edition): SiteData {
  const current = getSiteData();
  const existingIdx = current.editions.findIndex(
    (e) =>
      String(e.id) === String(edition.id) ||
      Number(e.year) === Number(edition.year),
  );
  let updatedEditions: Edition[];
  if (existingIdx >= 0) {
    updatedEditions = [...current.editions];
    updatedEditions[existingIdx] = edition;
  } else {
    updatedEditions = [edition, ...current.editions];
  }

  // Sort descending by year
  updatedEditions.sort((a, b) => Number(b.year) - Number(a.year));

  const updated = {
    ...current,
    editions: updatedEditions,
  };
  saveSiteData(updated);
  return updated;
}

export function upsertPost(post: BlogPost): SiteData {
  const current = getSiteData();
  const existingIdx = current.posts.findIndex(
    (p) => p.id === post.id || p.slug === post.slug,
  );
  let updatedPosts: BlogPost[];
  if (existingIdx >= 0) {
    updatedPosts = [...current.posts];
    updatedPosts[existingIdx] = post;
  } else {
    updatedPosts = [post, ...current.posts];
  }

  const updated = {
    ...current,
    posts: updatedPosts,
  };
  saveSiteData(updated);
  return updated;
}
