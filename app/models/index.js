import Role from "./role.model.js";
import User from "./user.model.js";
import mongoose from "mongoose";

const { Promise } = global;

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;


db.user = User;
db.role = Role;

db.ROLES = ["user", "admin", "HrManager"];

export default db;





