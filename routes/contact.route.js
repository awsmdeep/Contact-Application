import express from "express"
const router =express.Router();
import { getAllContacts,getOneContact,updateContact,deleteContact,createContact } from "../controllers/contact.controller.js";

router.get("/",getAllContacts)
router.get("/:id",getOneContact)

router.post("/",createContact)
router.put("/:id",updateContact)
router.delete("/:id",deleteContact)
export default router;