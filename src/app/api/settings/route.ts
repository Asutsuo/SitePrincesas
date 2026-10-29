import { NextResponse } from "next/server";
import { getSiteData, updateSettings } from "@/lib/data-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { pin, ...settingsToUpdate } = body;

    const currentData = getSiteData();
    if (!pin || pin !== currentData.settings.adminPin) {
      return NextResponse.json(
        { success: false, error: "Código de acesso incorreto" },
        { status: 401 },
      );
    }

    const updatedData = updateSettings(settingsToUpdate);
    return NextResponse.json(
      { success: true, data: updatedData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("API /settings error:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao atualizar configurações" },
      { status: 500 },
    );
  }
}
