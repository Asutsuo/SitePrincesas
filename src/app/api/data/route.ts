import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/data-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = getSiteData();
    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("API /data error:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao carregar dados" },
      { status: 500 },
    );
  }
}
