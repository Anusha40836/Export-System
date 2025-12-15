// lib/exporters/csv-exporter.ts

import { Readable } from "stream"
import { ExportRecord } from "@/types/export"

/**
 * Escapes CSV values safely:
 * - Wraps in quotes if needed
 * - Escapes double quotes
 */
function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return ""

  const str = String(value)

  // If value contains special CSV characters, wrap in quotes
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }

  return str
}

/**
 * Creates a streaming CSV readable stream.
 * Data is fetched in batches and streamed row-by-row.
 */
export function createCSVStream(
  fetchBatch: (
    offset: number,
    limit: number
  ) => Promise<{ records: ExportRecord[]; hasMore: boolean }>,
  batchSize = 1000
): Readable {
  let offset = 0
  let headerWritten = false

  return new Readable({
    async read() {
      // Write header only once
      if (!headerWritten) {
        this.push("ID,Name,Email,Category,Created Date\n")
        headerWritten = true
      }

      const { records, hasMore } = await fetchBatch(offset, batchSize)

      for (const record of records) {
        const row = [
          escapeCSV(record.id),
          escapeCSV(record.name),
          escapeCSV(record.email),
          escapeCSV(record.category),
          escapeCSV(record.createdDate.toISOString()),
        ].join(",")

        this.push(row + "\n")
      }

      offset += batchSize

      // End stream when no more data
      if (!hasMore) {
        this.push(null)
      }
    },
  })
}
