import mongoose, { Schema, Document } from "mongoose"

export interface ExportDocument extends Document {
  exportId: string
  status: "PENDING" | "COMPLETED" | "FAILED"
  objectName?: string
  createdAt: Date
  updatedAt: Date
}

const ExportSchema = new Schema<ExportDocument>(
  {
    exportId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      required: true,
    },
    objectName: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.Export ||
  mongoose.model<ExportDocument>("Export", ExportSchema)
