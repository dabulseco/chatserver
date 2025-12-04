import { Router } from 'express';
import { searchContact, getContactForDMList, getAllContact } from '../controllers/ContactsController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const contactRoutes = Router();

contactRoutes.post('/search', verifyToken, searchContact);
contactRoutes.get('/get-contact-for-dm', verifyToken, getContactForDMList);
contactRoutes.get('/get-all-contact', verifyToken, getAllContact);

export default contactRoutes;