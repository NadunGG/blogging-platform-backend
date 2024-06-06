import * as dynamoose from 'dynamoose';

export const PostSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      schema: [String],
      required: false,
    },
  },
  { timestamps: true },
);

export const PostTable = dynamoose.model('Posts', PostSchema);
