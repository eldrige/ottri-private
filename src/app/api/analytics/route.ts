import { runReport } from "@/lib/api/analytics";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const report = await runReport();

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error generating analytics report:", error);
    return NextResponse.json(
      { error: `Failed to generate analytics report: ${error}` },
      { status: 500 }
    );
  }
}
