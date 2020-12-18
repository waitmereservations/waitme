sleep 8

echo "$(date -Iseconds) - Running mongorestore --archive=minos-test-db"
mongorestore --archive="./seed-data/minos/data/minos-test-db" --gzip --drop


/*

db.tables.drop();
db.tables.insertMany([
    {"_id":"5faf0a6ba88b64a5c8d13189","table_number":"Table 1","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:27.637Z"},"updatedAt":{"$date":"2020-12-13T03:43:08.008Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ba88b64a5c8d1318a","table_number":"Table 2","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:27.753Z"},"updatedAt":{"$date":"2020-12-15T18:51:12.152Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ba88b64a5c8d1318b","table_number":"Table 3","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:27.848Z"},"updatedAt":{"$date":"2020-12-15T18:35:40.386Z"},"__v":0,"parties":{"$oid":"5faf17c37c989da9c60a8481"},"table_status":null},
    {"_id":"5faf0a6ba88b64a5c8d1318c","table_number":"Table 4","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:27.946Z"},"updatedAt":{"$date":"2020-12-13T03:42:05.549Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d1318d","table_number":"Table 5","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.043Z"},"updatedAt":{"$date":"2020-12-15T18:35:46.493Z"},"__v":0,"parties":{"$oid":"5fbc7e2d31061249f258f948"},"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d1318e","table_number":"Table 6","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.141Z"},"updatedAt":{"$date":"2020-12-11T22:00:58.471Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d1318f","table_number":"Table 7","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.239Z"},"updatedAt":{"$date":"2020-12-11T22:00:54.088Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d13190","table_number":"Table 8","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.341Z"},"updatedAt":{"$date":"2020-12-13T03:42:22.602Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d13191","table_number":"Table 9","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.441Z"},"updatedAt":{"$date":"2020-12-11T22:00:55.748Z"},"__v":0,"parties":null,"table_status":{"$oid":"5f78ea621346158999252ccf"}},
    {"_id":"5faf0a6ca88b64a5c8d13192","table_number":"waitlist","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.54Z"},"updatedAt":{"$date":"2020-12-15T18:35:40.21Z"},"__v":0,"parties":null,"table_status":null},
    {"_id":"5faf0a6ca88b64a5c8d13193","table_number":"reservation","capacity":4,"createdAt":{"$date":"2020-11-13T22:36:28.637Z"},"updatedAt":{"$date":"2020-12-11T04:27:31.271Z"},"__v":0,"parties":{"$oid":"5faf17bd7c989da9c60a847f"},"table_status":null}
])
*/