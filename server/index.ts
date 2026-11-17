import Fastify from 'fastify'
import { db } from './db.ts'

const app = Fastify({ logger: true })

app.get('/api/health', async () => ({ ok: true }))

app.get('/api/rooms', async () => {
  const { rows } = await db.query(
    'SELECT id, name, free_seats AS "freeSeats" FROM rooms ORDER BY id',
  )
  return rows
})

const port = Number(process.env.PORT ?? 3000)
await app.listen({ port, host: '0.0.0.0' })
