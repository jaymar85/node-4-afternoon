const users = require("../models/users"); // importing an array of all users

// We'll use this variable to assign ids to newly registered users and then increment it by one so no users have the same id.
let id = 1;

module.exports = {
    // This method should look for a username and password on the request body and then create a user object. 
    register: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;
      
        users.push({id, username, password});
        id++;
      
        session.user.username = username;
      
        res.status(200).send(session.user);
    },
    // This method should use username and password from the request body to find a user object in the users array with the same user/pass combination.
    login: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;
        const user = users.find(user => user.username === username && user.password === password);
      
        if(user) {
          session.user.username = user.username;
          res.status(200).send(session.user);
        } else {
          res.status(500).send('Unauthorized.');
        }
    }, 
    // This method is responsible for destroying the session and returning it as undefined
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    }, 
    // This method is responsible for reading the user object off of session and return it with a status of 200.
    getUser: (req, res) => {
        const {session} = req;
        res.status(200).send(session.user);
    }
};