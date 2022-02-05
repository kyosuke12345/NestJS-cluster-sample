import { Injectable } from '@nestjs/common';

import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;

@Injectable()
export class AppService {
  getHello(): string {
    console.log(cluster.worker.id)
    return `Worker ID: ${cluster.worker?.id} PID: ${cluster.worker.process.pid}`;
  }
}
