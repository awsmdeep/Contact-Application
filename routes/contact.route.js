import express from "express"
import { validToken } from "../middleware/validateToken.js"
const router =express.Router();
import { getAllContacts,getOneContact,updateContact,deleteContact,createContact } from "../controllers/contact.controller.js";

router.use(validToken)

router.get("/",getAllContacts)
router.get("/:id",getOneContact)

router.post("/",createContact)
router.put("/:id",updateContact)
router.delete("/:id",deleteContact)
export default router;