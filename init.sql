CREATE TABLE song_data (
  id serial NOT NULL PRIMARY KEY,
  SongTitle varchar(255),
  ArtistName varchar(255),
  NonOvernightReplays int,
  StationReplays int,
  MarketReplays int,
  BreakoutName varchar(255),
  BreakoutMetric1 int,
  BreakoutMetric2 int,
  BreakoutMetric3 int,
  BreakoutMetric4 int,
  BreakoutMetric5 int,
  BreakoutMetric6 int,
  BreakoutMetric7 int,
  BreakoutMetric8 int,
  BreakoutMetric9 int
);

CREATE UNIQUE INDEX idx_example ON song_data(SongTitle, ArtistName, BreakoutName, BreakoutMetric1, BreakoutMetric2,
BreakoutMetric3, BreakoutMetric4, BreakoutMetric5, BreakoutMetric6, BreakoutMetric7, BreakoutMetric8, BreakoutMetric9);