# iheartmedia coding challenge

First, run `docker-compose up -d` in project root to start the database.

## data-processing

In `data-processing` directory, run:

```
npm install
sam local invoke processSongData
```

This will add the data in the CSV file to the database.

The database can then be queried directly via:

```
docker exec -it sam-postgres-db
PGPASSWORD=tuZKQb5nVx psql --user dbuser -h localhost -d song_data
SELECT COUNT(*) FROM song_data;
```

The example query returns the number of rows in the database, which should be 880 (one less than number of lines in CSV).

I assumed that song title, artist name, breakout name, and metrics uniquely identified a row in the CSV file to prevent duplicates.

For simplicity, I added everything to one table. Songs could have been one table and then metrics another.

## api

In `api` directory, run:

```
npm install
sam local invoke getQualifiedSongs --event events/event.json
```

This makes a request for an API using the POST request specified in events/event.json. The example JSON will correspond to a query containing songs that have "BreakoutName" = "BreakoutName1" and "BreakoutMetric1" > 2.

If you have jq installed, you can see a formatted response via:

`sam local invoke getQualifiedSongs --event events/event.json | jq`

## Known Issues

Database environment variables specified in both template.yaml's and docker-compose.yaml.
