import app from "./app";
import config from "./config";

function bootstrap() {
  app.listen(config.port, () => {
    console.log(`SERVER RUNNING ON PORT ${config.port}`);
  });
}

bootstrap();
