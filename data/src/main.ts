import app from "./app.ts";
import { env } from "./config/env.ts";

app.listen(env.port, () => {
  console.log(`Data service running on port ${env.port}`);
});