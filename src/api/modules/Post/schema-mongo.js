import mongoose from 'mongoose';
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  comments:[Number],
  id: {
    type: Number,
    required: true,
    unique: true
  },
});
postSchema.plugin(autoIncrement.plugin, {model: 'Post', field: 'id'});
//postSchema.plugin(AutoIncrement, {id: 'inhabitant_seq', inc_field: 'id'});
export default mongoose.model('Post', postSchema );
