import defaultSiteData from "../src/data/initial-data.json";

export interface Env {
  ASSETS: any;
  SITE_KV?: any;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

async function getStoredSiteData(env: Env): Promise<any> {
  if (env.SITE_KV) {
    try {
      const data = await env.SITE_KV.get("site_data", "json");
      if (data && typeof data === "object") {
        return data;
      }
    } catch (err) {
      console.error("Error reading from SITE_KV:", err);
    }
  }
  return JSON.parse(JSON.stringify(defaultSiteData));
}

async function saveStoredSiteData(env: Env, data: any): Promise<boolean> {
  if (env.SITE_KV) {
    try {
      await env.SITE_KV.put("site_data", JSON.stringify(data));
      return true;
    } catch (err) {
      console.error("Error saving to SITE_KV:", err);
    }
  }
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // API Routes
    if (url.pathname === "/api/data") {
      const data = await getStoredSiteData(env);
      const isKvConnected = Boolean(env.SITE_KV);
      return jsonResponse({
        success: true,
        data,
        kvConnected: isKvConnected,
      });
    }

    if (url.pathname === "/api/settings" && request.method === "POST") {
      try {
        const body = (await request.json()) as any;
        const currentData = await getStoredSiteData(env);
        const correctPin = currentData?.settings?.adminPin || "princesas2026";

        if (body.pin !== correctPin && (correctPin !== "princesas2026" || body.pin !== "princesas2026")) {
          return jsonResponse(
            {
              success: false,
              error: "Senha incorreta.",
              pinChanged: correctPin !== "princesas2026",
            },
            401,
          );
        }

        currentData.settings = currentData.settings || {};
        if (body.currentThemeKey) currentData.settings.currentThemeKey = body.currentThemeKey;
        if (body.customColorHex) currentData.settings.customColorHex = body.customColorHex;
        if (body.contactWhatsapp) currentData.settings.contactWhatsapp = body.contactWhatsapp;
        if (body.churchName) currentData.settings.churchName = body.churchName;
        if (body.churchAddress) currentData.settings.churchAddress = body.churchAddress;
        if (body.motto) currentData.settings.motto = body.motto;
        if (body.adminPin && String(body.adminPin).trim().length >= 4) {
          currentData.settings.adminPin = String(body.adminPin).trim();
        }

        const savedToKv = await saveStoredSiteData(env, currentData);
        return jsonResponse({
          success: true,
          message: "Configurações salvas com sucesso!",
          data: currentData,
          savedToKv,
        });
      } catch (err: any) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/editions" && request.method === "POST") {
      try {
        const body = (await request.json()) as any;
        const currentData = await getStoredSiteData(env);
        const correctPin = currentData?.settings?.adminPin || "princesas2026";

        if (body.pin !== correctPin && (correctPin !== "princesas2026" || body.pin !== "princesas2026")) {
          return jsonResponse(
            {
              success: false,
              error: "Senha incorreta.",
              pinChanged: correctPin !== "princesas2026",
            },
            401,
          );
        }

        currentData.editions = currentData.editions || [];

        // Delete edition
        if (body.action === "delete" && body.editionId) {
          currentData.editions = currentData.editions.filter((e: any) => String(e.id) !== String(body.editionId));
        } else if (body.edition) {
          // Add or edit edition
          const idx = currentData.editions.findIndex((e: any) => String(e.id) === String(body.edition.id));
          if (idx >= 0) {
            currentData.editions[idx] = { ...currentData.editions[idx], ...body.edition };
          } else {
            currentData.editions.unshift(body.edition);
          }
        }

        const savedToKv = await saveStoredSiteData(env, currentData);
        return jsonResponse({
          success: true,
          message: "Edição atualizada com sucesso!",
          data: currentData,
          savedToKv,
        });
      } catch (err: any) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/posts" && request.method === "POST") {
      try {
        const body = (await request.json()) as any;
        const currentData = await getStoredSiteData(env);
        const correctPin = currentData?.settings?.adminPin || "princesas2026";

        if (body.pin !== correctPin && (correctPin !== "princesas2026" || body.pin !== "princesas2026")) {
          return jsonResponse(
            {
              success: false,
              error: "Senha incorreta.",
              pinChanged: correctPin !== "princesas2026",
            },
            401,
          );
        }

        currentData.posts = currentData.posts || [];

        // Delete post
        if (body.action === "delete" && body.postId) {
          currentData.posts = currentData.posts.filter((p: any) => String(p.id) !== String(body.postId));
        } else if (body.post) {
          // Add or edit post
          const idx = currentData.posts.findIndex((p: any) => String(p.id) === String(body.post.id));
          if (idx >= 0) {
            currentData.posts[idx] = { ...currentData.posts[idx], ...body.post };
          } else {
            currentData.posts.unshift(body.post);
          }
        }

        const savedToKv = await saveStoredSiteData(env, currentData);
        return jsonResponse({
          success: true,
          message: "Postagem atualizada com sucesso!",
          data: currentData,
          savedToKv,
        });
      } catch (err: any) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    // Default to serving static assets from Next.js export
    return env.ASSETS.fetch(request);
  },
};
