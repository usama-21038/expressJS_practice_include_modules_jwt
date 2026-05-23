import express, { type Application} from 'express';

import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import fs from "fs"
import logger from './middleware/logger';


const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


// middleware
app.use(logger);


app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.status(200).json({
        message: "Express with TypeScript is working fine",
        author: "Next Level Web Development",
    })
}
);

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use("/api/auth", authRoute);


export default app;