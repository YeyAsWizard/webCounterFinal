const SERVER_PORT = 50001
const PROTO_PATH = "./counter.proto";
const OPTIONS = {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
};
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, OPTIONS);
const counter_proto = grpc.loadPackageDefinition(packageDefinition);

function onGetCount(call, callback){
    newCount = call.request.count+(call.request.operation*call.request.multiply)
    callback(null, {message: newCount})
    console.log(newCount)
}

function main(){
    const server = new grpc.Server();
    server.addService(counter_proto.countMultiply.service,{
        countMultiply: onGetCount,
    })

    server.bindAsync(
        `0.0.0.0:${SERVER_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        () => {server.start()}
    )
}

main();