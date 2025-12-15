import { randomUUID } from "crypto"
import { fetchExportBatch } from "./data-source"
import { createCSVStream } from "./exporters/csv-exporter"
import { minioClient, EXPORT_BUCKET } from "./minio"
import {
  createExport,
  markExportCompleted,
  markExportFailed,
} from "./export-status"

export async function startCSVExport(): Promise<{
  exportId: string
  objectName: string
}> {
  const exportId = randomUUID()
  const objectName = `exports/export-${exportId}.csv`

  await createExport(exportId)

  try {
    const csvStream = createCSVStream(fetchExportBatch)

    await minioClient.putObject(
      EXPORT_BUCKET,
      objectName,
      csvStream,
      {
        "Content-Type": "text/csv",
      }
    )

    await markExportCompleted(exportId, objectName)

    return { exportId, objectName }
  } catch (error) {
    await markExportFailed(exportId)
    throw error
  }
}
