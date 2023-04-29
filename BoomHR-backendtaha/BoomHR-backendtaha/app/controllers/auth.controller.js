const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Departement = require("../models/departement.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
// get all departements
exports.getDepartements = async (req, res) => {
  try {
      const departements = await Departement.find();
      res.status(200).json(departements);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }


};
// add one departement
exports.createDepartement = async (req, res) => {
 
  try {
    const newDepartement = new Departement({
      name: req.body.name,
      description: req.body.description,
      employeId:req.body.employeId,
      chefId:req.body.chefId,
     
    });
      await newDepartement.save();
      res.status(201).json(newDepartement);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
};

// delete one departement
exports.deleteDepartement = async (req, res) => {
  const { id } = req.params;
 // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No departement with id: ${id}`);
  try {
      await Departement.findByIdAndRemove(id);
      res.json({ message: "Departement deleted successfully." });
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
};
