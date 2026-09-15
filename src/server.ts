import 'dotenv/config';
import { app } from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT ?? 3001);

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Tech Reporter API listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start Tech Reporter API:', error);
  process.exit(1);
});
