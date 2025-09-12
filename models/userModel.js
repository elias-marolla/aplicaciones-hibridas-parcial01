import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Scm = new Schema({
    email: String,
    name: String,
    password: String
});

const model = mongoose.model('User',Scm);

export default model;
