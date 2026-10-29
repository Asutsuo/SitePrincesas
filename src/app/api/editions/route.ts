import { NextResponse } from "next/server";
import { getSiteData, upsertEdition } from "@/lib/data-store";
import { Edition } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { pin, edition } = body;

    const currentData = getSiteData();
    if (!pin || pin !== currentData.settings.adminPin) {
      return NextResponse.json(
        { success: false, error: "Código de acesso incorreto" },
        { status: 401 },
      );
    }

    if (!edition || !edition.year || !edition.title) {
      return NextResponse.json(
        { success: false, error: "Dados da edição incompletos" },
        { status: 400 },
      );
    }

    const updatedData = upsertEdition(edition as Edition);
    return NextResponse.json(
      { success: true, data: updatedData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("API /editions error:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao salvar edição" },
      { status: 500 },
    );
  }
}
