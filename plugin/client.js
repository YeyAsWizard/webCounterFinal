const SERVER_PORT = 50001
const PROTO_PATH = "./counter.proto";
const OPTIONS = {
 keepCase: true, 
 longs: String, 
 enums: String,
 defaults: true,
 oneofs: true, 
}

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { error } = require('console');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, OPTIONS);
const counter_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
	const client = new counter_proto.countMultiply(
        `localhost:${SERVER_PORT}`,
        grpc.credentials.createInsecure()
    );
    client.countMultiply({"count": 50, "multiply": 21, "operation": -1}, (error, response) => {
        response ? console.log(`${response.newCount}`) : console.log(error)
    })
}

main();

/*
 const client = new std_proto.addScore(
 `localhost:${SERVER_PORT}`,
 grpc.credentials.createInsecure()
 );

 client.addScore({name: "YEYE", score: 100}, (error, response) => {
 response ? console.log(`${response.message}`) : console.log(error)
 })

 const client = new std_proto.addScore(
 `localhost:${SERVER_PORT}`,
 grpc.credentials.createInsecure()
 );

 client.getScore(null, (error, response) => {
 response ? console.log(`${response.message}`) : console.log(error)
})
}

main();
*/
