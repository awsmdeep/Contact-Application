import asyncHandler from "express-async-handler";
import { Contact } from "../models/contact.model.js";

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

export const getOneContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

export const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNumber } = req.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phoneNumber,
    user_id:req.user.id
  });

  res.status(201).json(contact);
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("user dont have permission to update other user contacts")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("user dont have permission to delete other user contacts")
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `deleted contact ${req.body.name}` });
});
