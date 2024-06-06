import * as dynamoose from 'dynamoose';

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const UserTable = dynamoose.model('Users', UserSchema);
