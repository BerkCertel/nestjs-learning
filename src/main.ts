import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Pool } from 'pg';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 5000;
  await app.listen(port);

  if (app) {
    console.log(`✅ Server is running on port ${port}`);
  } else {
    console.error('🔴 Server failed to start');
    process.exit(1);
  }

  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    ssl: process.env.POSTGRES_SSL === 'true',
  });

  try {
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connection successful!');
  } catch (err) {
    console.error('🔴 PostgreSQL connection error:', (err as Error).message);
  } finally {
    await pool.end();
  }

  const prisma = app.get(PrismaService);

  try {
    await prisma.$connect();
    console.log('✅ Prisma connection successful!');
  } catch (error) {
    console.error('🔴 Prisma connection error:', error);
    process.exit(1);
  }
}

void bootstrap();
