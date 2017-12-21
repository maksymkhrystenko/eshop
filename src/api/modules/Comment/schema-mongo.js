import mongoose from 'mongoose';
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const commentSchema = mongoose.Schema({
  content: String,
  postId: Number,
  id: {
    type: Number,
    required: true,
    unique: true
  },
});

commentSchema.plugin(autoIncrement.plugin, {model: 'Comment', field: 'id'});
//commentSchema.plugin(AutoIncrement, {id: 'inhabitant_seq', inc_field: 'id'});
export default mongoose.model('Comment', commentSchema );
