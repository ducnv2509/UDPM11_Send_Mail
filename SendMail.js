import express, { urlencoded } from 'express';
import myLogger from "./winstonLog/winston.js";
import dotenv from 'dotenv';
import cors from 'cors';
import mailAPI from './routers/SendMailRouter.js'
import { BAD_REQUEST, CREATED, NO_CONTENT, OK } from './constant/HttpResponseCode.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', mailAPI)
app.use((data, req, res, next) => {
    let statusCode = data.statusCode;
    // myLogger.info(data)
    if (statusCode !== OK && statusCode !== CREATED && statusCode !== NO_CONTENT) {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Error: " + JSON.stringify(data), { label: "RESPONSE-ERROR" });
        res.status(statusCode || BAD_REQUEST).send({
            code: statusCode,
            error: data.data ? data.data : data.error,
            description: data.description
        })
    } else {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: %o", data.data, { label: "RESPONSE-OK" });
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: " + JSON.stringify(data.data), { label: "RESPONSE-OK" });
        res.status(statusCode).send(data.data)
    }
});

//  publicMobile();
const portNode = process.env.UDPM11_PORTNODE || 5000
const host_node = '0.0.0.0';
function myListener() {
    myLogger.info(`Listening on port ${portNode}..`);
}
app.listen(portNode, host_node, myListener)