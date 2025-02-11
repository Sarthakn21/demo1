import { Module } from '@nestjs/common';
import { cassandraClient } from './cassandra.config';

@Module({
  providers: [{ provide: 'CASSANDRA_CLIENT', useValue: cassandraClient }],
  exports: ['CASSANDRA_CLIENT'],
})
export class DatabaseModule {}
