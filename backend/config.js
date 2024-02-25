import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;
const mongoDBURL = process.env.MONGODB_URI;

export { port, mongoDBURL };
