import express from 'express';
import { config } from 'dotenv';
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";

const app = express();

config();
dbConnect();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/refresh-token', refreshTokenRoutes)
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}...`));