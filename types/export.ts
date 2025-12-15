// types/export.ts

// Represents ONE row in the exported file
export interface ExportRecord {
  id: number
  name: string
  email: string
  category: string
  createdDate: Date
}

// Supported export formats
export type ExportFormat = "csv" | "xlsx"

// Export lifecycle states
export type ExportStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"

// Response sent to frontend when export is triggered
export interface StartExportResponse {
  exportId: string
  status: ExportStatus
}
