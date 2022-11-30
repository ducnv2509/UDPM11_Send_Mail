import express from 'express';
import { CRUD_Comment, forgotPass, unionTicket, uploadFile } from '../controllers/SendMailController.js';
const router = express.Router();

router.post('/mailforgotpass', async (req, res, next) => {
    let { fullname, email, url_reset } = req.body;
    let response = forgotPass(fullname, email, url_reset);
    next(response);
})

router.post('/sendMailComment', async (req, res, next) => {
    let { id, email, name_ticket, type, comment_txt, status } = req.body;
    let response = CRUD_Comment(id, email, name_ticket, type, comment_txt, status);
    next(response);
})

router.post('/sendMailUnionTicket', async (req, res, next) => {
    let { listId, id_main, email } = req.body;
    let response = unionTicket(listId, id_main, email);
    next(response);
})



router.post('/sendMailUploadFile', async (req, res, next) => {
    let { id, email, name_ticket, name_file } = req.body;
    let response = uploadFile(id, email, name_ticket, name_file);
    next(response);
})
export default router;