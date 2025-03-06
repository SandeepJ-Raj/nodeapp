const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');
// GET get all contacts
//route GET /api/contacts
// access public

const getContacts = asyncHandler(async(req, res) => {
    const contact = await contactModel.find();
    res.json(contact);
})

// GET get contact by id
//route GET /api/contact/:id
// access public

const getContact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.json({message: `get contact from controller id: ${req.params.id}`, data: contact});
})

// POST create contact 
//route POST /api/contact
// access public

const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) 
    {
        res.status(500);
        throw new Error("Invalid data");
    }
    
    const contact = await contactModel.create({name, email, phone});
    res.json({message: `create contact from controller`, data: contact});
})

// PUT update contact 
//route PUT /api/contact
// access public

const updateContact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updataContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json({message: `update contact from controller id: ${req.params.id}`, data: updataContact});
})

// DELETE delete contact 
//route DELETE /api/contact/:id
// access public

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await contact.deleteOne({_id: req.params.id});
    res.json({message: `delete contact from controller id: ${req.id}`, data: contact});
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
