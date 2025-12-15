import { NextResponse } from "next/server"
import { getExportStatus } from "@/lib/export-status"

export async function GET(
  _: Request,
  { params }: { params: Promise<{ exportId: string }> }
) {
  const { exportId } = await params

  const record = await getExportStatus(exportId)

  if (!record) {
    return NextResponse.json(
      { error: "Export not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(record)
}
