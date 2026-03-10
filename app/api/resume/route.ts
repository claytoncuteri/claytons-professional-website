import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Clayton_Cuteri_Resume.pdf");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Clayton_Cuteri_Resume.pdf",
    },
  });
}
