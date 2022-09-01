const fs = require("fs")
const path = require("path")
const { Pool } = require("pg")
const csv = require("fast-csv")

function parseCsv() {
  return new Promise((resolve) => {
    const data = []
    fs.createReadStream(path.resolve(__dirname, "..", "..", "song_data.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        data.push(Object.values(row))
      })
      .on("end", () => {
        resolve(data)
      })
  })
}
async function insertData(data) {
  const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    user: process.env.DB_USER,
    port: 5432,
  })
  const query =
    "INSERT INTO song_data (SongTitle,ArtistName,NonOvernightReplays,StationReplays,MarketReplays,BreakoutName,BreakoutMetric1,BreakoutMetric2,BreakoutMetric3,BreakoutMetric4,BreakoutMetric5,BreakoutMetric6,BreakoutMetric7,BreakoutMetric8,BreakoutMetric9) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT DO NOTHING"
  const client = await pool.connect()
  const promises = data.map((row) => client.query(query, row))
  await Promise.all(promises)
}

exports.processSongData = async () => {
  const data = await parseCsv()
  await insertData(data)
  return {
    statusCode: 200,
    body: {
      message: "success",
    },
  }
}
