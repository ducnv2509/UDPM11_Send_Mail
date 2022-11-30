import nodemailer from 'nodemailer';
import { OK } from '../constant/HttpResponseCode.js';
import myLogger from "../winstonLog/winston.js";
import dotenv from 'dotenv'
dotenv.config();



export async function forgotPass(fullname, email, url_reset) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.UDPM11_EMAIL,
            pass: process.env.UDPM11_EPASS
        }
    });
    let mailOptions = {
        from: process.env.UDPM11_EMAIL,
        to: `${email}`,
        subject: 'Reset Password',
        text: `Dear ${fullname},

        Link reset password: ${url_reset}
        
        Best & Regard.
        SHOP Nhật Minh Team.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { statusCode: 500, error: 'ERROR', description: 'System busy!' };
        } else {
            return { statusCode: 200 };
        }
    });

    return { statusCode: OK }
}


export async function CRUD_Comment(id, email, name_ticket, type, comment_txt, status) {
    let username = email.split("@");
    let transporter = nodemailer.createTransport({
        host: process.env.CA_MAILSERVER_HOSTDB,
        port: 587,
        secure: false,
        auth: {
            user: process.env.CA_USERMAILSERVER,
            pass: process.env.CA_PASSMAILSERVER
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // myLogger.info(transporter.)
    let mailOptions;
    if (type == 'comment' && status == 'created') {
        mailOptions = {
            from: `fis-itservices@srv.fis.vn`,
            to: `${email}`,
            subject: 'Create Comment',
            text: `Dear ${username},
    
            Bạn đã comment vào ticket có id: ${id} -- name: ${name_ticket}, với nội dung: ${comment_txt}`
        };
    } else if (type == 'comment' && status == 'edited') {
        mailOptions = {
            from: `fis-itservices@srv.fis.vn`,
            to: `${email}`,
            subject: 'Update Comment',
            text: `Dear ${username},
    
            Bạn đã update comment ticket có id: ${id} -- name: ${name_ticket}, với nội dung: ${comment_txt}`
        };
    } else if (type == 'comment' && status == 'deleted') {
        mailOptions = {
            from: `fis-itservices@srv.fis.vn`,
            to: `${email}`,
            subject: 'Delete Comment',
            text: `Dear ${username},
    
            Bạn đã xoá comment ticket có id: ${id} -- name: ${name_ticket}`
        };
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { statusCode: 500, error: 'ERROR', description: 'System busy!' };
        } else {
            return { statusCode: 200 };
        }
    });

    return { statusCode: OK }
}

export async function unionTicket(listId, id_main, email) {
    let username = email.split("@");
    let transporter = nodemailer.createTransport({
        host: process.env.CA_MAILSERVER_HOSTDB,
        port: 587,
        secure: false,
        auth: {
            user: process.env.CA_USERMAILSERVER,
            pass: process.env.CA_PASSMAILSERVER
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // myLogger.info(transporter.)
    let mailOptions = {
        from: `fis-itservices@srv.fis.vn`,
        to: `${email}`,
        subject: 'Union Ticket',
        text: `Dear ${username},

        Bạn đã nhóm các ticket có id sau: ${listId} vào ticket có id: ${id_main}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { statusCode: 500, error: 'ERROR', description: 'System busy!' };
        } else {
            return { statusCode: 200 };
        }
    });

    return { statusCode: OK }
}



export async function uploadFile(id, email, name_ticket, name_file) {
    let username = email.split("@");
    let transporter = nodemailer.createTransport({
        host: process.env.CA_MAILSERVER_HOSTDB,
        port: 587,
        secure: false,
        auth: {
            user: process.env.CA_USERMAILSERVER,
            pass: process.env.CA_PASSMAILSERVER
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // myLogger.info(transporter.)
    let mailOptions = {
        from: `fis-itservices@srv.fis.vn`,
        to: `${email}`,
        subject: 'Upload File',
        text: `Dear ${username},

        Bạn đã uploadFile ${name_file} vào ticket có id: ${id} --- tên ticket: ${name_ticket}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { statusCode: 500, error: 'ERROR', description: 'System busy!' };
        } else {
            return { statusCode: 200 };
        }
    });

    return { statusCode: OK }
}
