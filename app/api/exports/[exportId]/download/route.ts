import { NextResponse } from "next/server"
import { minioClient, EXPORT_BUCKET } from "@/lib/minio"
import { getExportStatus } from "@/lib/export-status"

export async function GET(
  _: Request,
  { params }: { params: Promise<{ exportId: string }> }
) {
  const { exportId } = await params

  const record = await getExportStatus(exportId)

  if (!record || record.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "Export not ready" },
      { status: 400 }
    )
  }

  const url = await minioClient.presignedGetObject(
    EXPORT_BUCKET,
    record.objectName!,
    60 * 5
  )

  return NextResponse.json({ url })
}
