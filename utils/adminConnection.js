import { connect, connection, createConnection, connections } from "mongoose";
const conn = {
    isConnected: false,
};
const options = {
    maxPoolSize: 10,
    socketTimeoutMS: 10000,
    serverSelectionTimeoutMS: 15000
}
export async function adminConnection(userDb=null) {
    if(!userDb){
        return false
    }
    
    if (conn.isConnected) {
        console.log("USANDO CONEXION GUARDADA: " + userDb)        
        return conn.connection
    }

    console.log("🆕 CONECTANDO CON: " + userDb)
    try {
        console.log('Conexiones: ['+connections.length+"]")        
        // .asPromise()
        const con = createConnection(`mongodb://0.0.0.0:27017/${userDb}`, options)
        con.on("connected", () => console.log("Mongodb connected"));
        con.on("disconnected", () => console.log("Mongodb closed."));
        con.on("error", (err) => console.error("Mongodb Error:", err.message));
        
        conn.isConnected = connections[0].readyState
        conn.connection = con

        return con

    } catch (error) {
        console.log(error)
    }
    
}