const swag = require("../models/swag"); // importing the swag inventory

module.exports = {
    // This method is responsible for making sure the swag isn't already in the cart.
    add: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;
        const index = user.cart.findIndex(swag => swag.id == id); // This will return -1 if it isn't in the cart
      
        if (index === -1) {
           const selectedSwag = swag.find(swag => swag.id == id);
      
           user.cart.push(selectedSwag);
           user.total += selectedSwag.price;
        }  
        res.status(200).send(user);
    }, 
    // This method will be responsible for removing swag from the cart.
    delete: (req, res) => {
        const { id } = req.params;
        const { user } = req.session;
        const index = user.cart.findIndex(swag => swag.id == id);
        const selectedSwag = swag.find(swag => swag.id == id);
      
        if (index !== -1) {
            user.cart.splice(index, 1);
            user.total -= selectedSwag.price;
        }
        res.status(200).send(user);
    },
    // This method will be responsible for resetting the value cart to an empty array and total to 0.
    checkout: (req, res) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;
          
        res.status(200).send(user);    
    }
}; 