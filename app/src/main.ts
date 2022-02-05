import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

if (cluster.isPrimary) {
  console.log(`Master server started on ${process.pid} cpu len: ${os.cpus().length}`);

  // cpuの数分forkする
  for (var i = 0; i < os.cpus().length; i++) {
    console.log('cluster fork :', i);
    cluster.fork();
  }
} else {
  console.log('boot strap')
  bootstrap();
}

