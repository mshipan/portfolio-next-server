/* eslint-disable no-console */
import app from "./app";
import { prisma } from "./app/config/db";
import { seedOwner } from "./app/utils/seedOwner";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log("DB connected successfully.");
    
    await seedOwner();

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

bootstrap();

export default app;