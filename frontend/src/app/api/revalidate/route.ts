import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { section } = await request.json();

    if (section === "projects") {
      revalidatePath("/projects", "layout");
    } else if (section === "blog") {
      revalidatePath("/blog", "layout");
    } else {
      revalidatePath("/projects", "layout");
      revalidatePath("/blog", "layout");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
