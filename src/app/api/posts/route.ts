import { NextResponse } from "next/server";
import { getSiteData, upsertPost } from "@/lib/data-store";
import { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as any;
    const { pin, post } = body;

    const currentData = getSiteData();
    if (!pin || pin !== currentData.settings.adminPin) {
      return NextResponse.json(
        { success: false, error: "Código de acesso incorreto" },
        { status: 401 },
      );
    }

    if (!post || !post.title || !post.content) {
      return NextResponse.json(
        { success: false, error: "Título e conteúdo são obrigatórios" },
        { status: 400 },
      );
    }

    const updatedData = upsertPost(post as BlogPost);
    return NextResponse.json(
      { success: true, data: updatedData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("API /posts error:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao salvar post" },
      { status: 500 },
    );
  }
}
