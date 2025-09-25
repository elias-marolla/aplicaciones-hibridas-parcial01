import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Scm = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String },
    password: { type: String }
});

const model = mongoose.model('User',Scm);

export default model;
