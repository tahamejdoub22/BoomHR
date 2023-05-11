import User from "../models/user.model.js";
import role from "../models/role.model.js";


//geting the list of users : username, email and role in a table in angular 
export function ChangeRoleTab(req, res) {
    User.find({})
    // .populate("roles","name")
    .populate({ path: "roles", select: "-_id name" })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des données');
    });
  }
  
  //add and update
  //add a new user with the ability to update their details if the email already exists
  export function addUser(req, res) {
    const { username, email, roles, password } = req.body;
  
    // Check if the user already exists by email
    User
      .findOne({ email })
      .populate('roles', 'name')
      .then(existingUser => {
        if (existingUser) {
          // If the user already exists, update their role, username, or email
          if (roles) {
            existingUser.roles = roles;
          }
          if (username) {
            existingUser.username = username;
          }
          if (email) {
            existingUser.email = email;
          }
          existingUser
            .save()
            .then(updatedUser => {
              console.log(updatedUser);
              res.status(200).json({ message: 'User updated', user: updatedUser });
              return;
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Internal server error', error: err });
              return;
            });
        } else {
          // If the user doesn't exist, create a new user
          const newUser = new User({
            username,
            email,
            roles,
            password,
          });
  
          newUser
            .save()
            .then(savedUser => {
              console.log(savedUser);
              res.status(200).json({ message: 'User created', user: savedUser });
              return;
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Internal server error', error: err });
              return;
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
        return;
      });
  }
  
   
  export function getRoles (req, res) {
    role.find({})
    .then((role) => {
      res.send(role);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des données');
    });
  }

//update User BYID

export function updateUser (req, res) {
  const { id } = req.params;
  const { username, email, password, roles } = req.body;

  // Find the user by ID
  User.findById(id)
  .populate('roles', 'name')
    .then((user) => {
      // Update the user information
      user.username = username;
      user.email = email;
      user.password = password;
      user.roles = roles;
      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
};



//delete user by admin byid



export function deleteUser(req, res) {
  const userId = req.params.id;

  // Find the user by ID and delete it
  User.findOneAndDelete({ _id: userId })
    .then(deletedUser => {
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted', user: deletedUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error', error: err });
    });
}

  //edit username, role and/or password for agiveniduser or for givenemailuser
  function updateAndSaveUser(user, username, password, roles, res) {
    // Update the user object with the new values
    user.username = username;
    user.password = password;
    user.roles = roles; // Assuming that the roles property is an array of roles
  
    // Save the updated user object to the database
    User.save()
      .then(() => {
        res.send({ message: 'User information updated successfully' });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error updating user information' });
      });
  }


export function editUserInformation(req, res) {
  const { email, username, password, roles } = req.body;
  console.log("edit function in")

  let user;

  
    // User provided an ID
    User.findOne({ email: email })
    .then((foundUser) => {
        console.log("aaaaaaaaaaaaa"+ foundUser); // Add this line to log the foundUser object

        user = foundUser;
        console.log("bbbbbbbbbbb"+user)
        updateAndSaveUser(user, username, password, roles, res);
        console.log("ccccccccccccccc"+user)

      })
      .catch((err) => {
        res.status(404).send({ message: 'User not found' });
      });
  
}
  


