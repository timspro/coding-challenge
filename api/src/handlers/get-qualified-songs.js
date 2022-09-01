const { Client } = require("pg")

exports.getQualifiedSongs = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `getQualifiedSongs only accept POST method, you tried: ${event.httpMethod}`
    )
  }

  const { BreakoutName, BreakoutMetric1 } = JSON.parse(event.body)

  const client = new Client({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    user: process.env.DB_USER,
    port: 5432,
  })
  await client.connect()
  const { rows } = await client.query(
    "SELECT SongTitle, ArtistName, BreakoutName, BreakoutMetric1 from song_data WHERE BreakoutName = $1::text AND BreakoutMetric1 > $2::int",
    [BreakoutName, BreakoutMetric1]
  )
  await client.end()

  return {
    statusCode: 200,
    body: rows,
  }
}
