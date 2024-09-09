

export const getAllContacts=(req,res)=>{
    res.status(200).json({message:"get all contacts"})
    
}

export const getOneContact=(req,res)=>{
    res.status(200).json({message:`get contact ${req.params.id}`})
}

export const createContact=(req,res)=>{
    res.status(201).json({message:"create contact"})
}

export const updateContact=(req,res)=>{
    res.status(200).json({message:`update contact ${req.params.id}`})
}

export const deleteContact =(req,res)=>{
    res.status(200).json({message:`delete contact ${req.params.id}`})
}

