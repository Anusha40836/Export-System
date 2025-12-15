// lib/data-source.ts

import { ExportRecord } from "@/types/export"

// Total records to simulate (meets requirement ≥ 50,000)
const TOTAL_RECORDS = 100_000

// Batch fetch function (pagination-based)
export async function fetchExportBatch(
  offset: number,
  limit: number
): Promise<{
  records: ExportRecord[]
  hasMore: boolean
}> {
  const records: ExportRecord[] = []

  const end = Math.min(offset + limit, TOTAL_RECORDS)

  for (let i = offset; i < end; i++) {
    records.push({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      category: ["A", "B", "C"][i % 3],
      createdDate: new Date(Date.now() - i * 60_000),
    })
  }

  return {
    records,
    hasMore: end < TOTAL_RECORDS,
  }
}
