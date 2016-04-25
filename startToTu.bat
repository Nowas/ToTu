start pm2 start ./Resources/server.js --name="resources"
start pm2 start ./Beacon/server.js --name="beacon"
start pm2 start ./Search/server.js --name="search"
start pm2 start ./VehicleStopInfo/server.js --name="VehicleStopInfo"
start pm2 start ./VehicleRoute/server.js --name="VehicleRoute"
start pm2 start ./VehicleSimulator/app.js --name="VehicleSimulator"
start pm2 start ./VehicleStopSimulator/app.js --name="VehicleStopSimulator"

