import * as cassandra from 'express-cassandra';

export const cassandraClient = cassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'my_keyspace',
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'alter',
  },
});


const UserModel = cassandraClient.loadSchema('users', {
  fields: {
    id: 'uuid',
    username: 'text',
    email: 'text',
    password: 'text',
  },
  key: ['id'],
});


