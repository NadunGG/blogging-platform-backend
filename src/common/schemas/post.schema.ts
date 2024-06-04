import * as dynamoose from 'dynamoose';

const PostSchema = new dynamoose.Schema(
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

const PostTable = dynamoose.model('Posts', PostSchema);

export { PostTable, PostSchema };
