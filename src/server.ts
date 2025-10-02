import { Server } from "http";
import app from "./app";
import { prisma } from "./app/configs/db";
import envVariables from "./app/configs/env";

let server: Server;

const startServer = async () => {
  try {
    await prisma.$connect();
    server = app.listen(envVariables.PORT, () => {
      console.log(
        `Server is running on port ${envVariables.PORT} in ${envVariables.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

(async () => {
  // await connectRedis();
  await startServer();
})();

// *Graceful shutdown on process termination signals
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// *Handle unhandled rejections and uncaught exceptions
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// *Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
