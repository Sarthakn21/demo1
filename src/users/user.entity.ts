export const UserSchema = {
  fields: {
    id: 'uuid',
    username: 'text',
    email: 'text',
    password: 'text',
  },
  key: ['id'], // Primary Key
  table_name: 'users',
};
