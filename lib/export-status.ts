import { connectDB } from "./mongoose"
import Export from "@/models/Export"

export async function createExport(exportId: string) {
  await connectDB()

  await Export.create({
    exportId,
    status: "PENDING",
  })
}

export async function markExportCompleted(
  exportId: string,
  objectName: string
) {
  await connectDB()

  await Export.findOneAndUpdate(
    { exportId },
    {
      status: "COMPLETED",
      objectName,
    }
  )
}

export async function markExportFailed(exportId: string) {
  await connectDB()

  await Export.findOneAndUpdate(
    { exportId },
    {
      status: "FAILED",
    }
  )
}

export async function getExportStatus(exportId: string) {
  await connectDB()

  return Export.findOne({ exportId }).lean()
}
