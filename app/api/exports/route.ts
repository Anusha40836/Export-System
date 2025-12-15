// app/api/exports/route.ts

import { NextRequest, NextResponse } from "next/server"
import { startCSVExport } from "@/lib/export-service"
import { StartExportResponse } from "@/types/export"

export async function POST(req: NextRequest) {
  try {
    // Generate a unique export ID and start streaming upload
    const { exportId } = await startCSVExport()

    // Respond immediately with PROCESSING status
    const response: StartExportResponse = {
      exportId,
      status: "PROCESSING",
    }

    return NextResponse.json(response, { status: 202 })
  } catch (err: any) {
    console.error("Export failed:", err)
    return NextResponse.json(
      { status: "FAILED", error: err.message || "Export error" },
      { status: 500 }
    )
  }
}
