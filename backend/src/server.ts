import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});