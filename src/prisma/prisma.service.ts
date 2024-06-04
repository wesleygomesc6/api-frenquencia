import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query'],
      //   log: [
      //     { emit: 'event', level: 'query' },
      //     { emit: 'stdout', level: 'info' },
      //     { emit: 'stdout', level: 'warn' },
      //     { emit: 'stdout', level: 'error' },
      //   ],
      //   errorFormat: 'colorless',
    });
  }
}
