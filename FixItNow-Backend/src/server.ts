import app from './app';
import dotenv from 'dotenv';
import { seedAdmin } from './shared/seed';
dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await seedAdmin();
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
}

bootstrap();
