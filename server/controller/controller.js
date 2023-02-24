var contactDB = require('../model/model');

// create and save new contact
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty..!" });
        return;
    }

    // new contact
    const contact = new contactDB({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    })

    // save data to database
    contact
        .save(contact)
        .then(data => {
            // res.send(data)
            res.redirect('/business-contact-list')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
}

// retrive and return all contact and retrive and return single contact
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;
        contactDB.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found contact with id" +id});
                }
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving contact with id" +id});
            });
    }
    else{
        contactDB.find()
        .then(contact => {
            res.send(contact)
        })
        .catch(err => {
            res.send(500).send({ message: err.message || "Some error occured while retrieving the contact details" });
        });
    }

    
}

// update a new identified contact by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty..!!" });
    }
    const id = req.params.id;
    contactDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update contact with the ${id}. Maybe contact not found` });
            }
            else {
                res.send(data);
                
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating contact information" })
        });
}

//delete contact with id
exports.delete = (req, res) => {
    const id = req.params.id;

    contactDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete contact with ${id}. Maybe Id is incorrect` });
            }
            else {
                res.send({ message: "Contact deleted successfully..!!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete contact with id" + id });
        });
}