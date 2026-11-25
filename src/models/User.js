import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

export default mongoose.model('User', userSchema);