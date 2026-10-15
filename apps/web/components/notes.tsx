"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"

type Note = { id: string; title: string; body: string; createdAt: Date | string }

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const { data, error } = await api.api.notes.get()
    if (error) return setError(String(error.value))
    setNotes(data)
  }

  useEffect(() => {
    void load()
  }, [])

  async function add(form: FormData) {
    const { error } = await api.api.notes.post({ title: String(form.get("title")) })
    if (error) return setError(String(error.value))
    setError(null)
    await load()
  }

  async function remove(id: string) {
    await api.api.notes({ id }).delete()
    await load()
  }

  return (
    <div className="space-y-4">
      <form action={add} className="flex gap-2">
        <input
          name="title"
          placeholder="New note"
          required
          maxLength={200}
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-white">Add</button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white">
        {notes.length === 0 && <li className="px-4 py-3 text-zinc-500">No notes yet.</li>}
        {notes.map((n) => (
          <li key={n.id} className="flex items-center justify-between px-4 py-3">
            <span>{n.title}</span>
            <button onClick={() => remove(n.id)} className="text-sm text-zinc-500 underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
