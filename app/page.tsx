import Image from "next/image";
import ExportButtons from "./components/ExportButtons"; // <- import here

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Export System</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Welcome to the Export Service API. This system allows you to create,
            track, and download CSV exports asynchronously.
          </p>
        </header>

        {/* Overview */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-2 text-xl font-semibold">Overview</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The Export System is designed to handle large data exports using
            background processing. Each export is assigned a unique ID that can
            be used to check status and download the generated file.
          </p>

          {/* Export Buttons placed here */}
          <div className="mt-4">
            <ExportButtons />
          </div>
        </section>

        {/* API Routes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available API Routes</h2>
          {/* ... your existing route cards */}
        </section>

        {/* Example */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-2 text-xl font-semibold">Example</h2>
          <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`POST http://localhost:3000/api/exports

GET  http://localhost:3000/api/exports/3ff45a69-aaec-4049-bfd5-2a26b04b2ffd

GET  http://localhost:3000/api/exports/3ff45a69-aaec-4049-bfd5-2a26b04b2ffd/download`}
          </pre>
        </section>

        {/* Footer */}
        <footer className="pt-8 text-center text-sm text-zinc-500">
          Export System • Built with Next.js
        </footer>
      </main>
    </div>
  );
}
