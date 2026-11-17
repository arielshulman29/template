import { useEffect, useState } from 'react'
import './App.css'

type Room = { id: number; name: string; freeSeats: number }

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setRooms)
      .catch((err: unknown) => setError(String(err)))
  }, [])

  return (
    <main>
      <h1>Study rooms</h1>
      {error && <p className="error">Could not load rooms: {error}</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong>
            <span>{room.freeSeats} free seats</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
