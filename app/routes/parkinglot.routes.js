
module.exports = (app) => {
    const parkinglot = require('../controllers/parkinglot.controller.js');
    
    // Create a new Note
    app.post('/tickets',  parkinglot.create);



    // Retrieve a single Note with noteId
    app.get('/tickets/:ticketId', parkinglot.getDuration);

    // Update a Note with noteId
    app.post('/payments/:ticketId/:creditCardNo', parkinglot.pay);

    // // Delete a Note with noteId
    // app.delete('/parkinglot/:noteId', parkinglot.delete);
}