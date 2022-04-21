import app from "../app";
import * as http from "http";
import * as debugModule from "debug";
var debug = debugModule.debug("noodele:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | boolean {
  const nport = parseInt(val, 10);

  if (isNaN(nport)) {
    // named pipe
    return val;
  }

  if (nport >= 0) {
    // port number
    return nport;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  function bind(): string | void {
    const addr = server.address();
    if (addr === null) {
      return "";
    }

    if (typeof addr === "string") {
      return "pipe " + addr;
    }

    if ("port" in addr) {
      return "port " + addr.port;
    }
  }

  debug("Listening on " + bind());
}
