import express from "express";

import {ChangeRoleTab,addUser,updateUser,editUserInformation,deleteUser,getRoles} from '../controllers/user.js'

const router = express.Router();



router
    .route("/admin/roles")
    .get(getRoles)
router
    .route("/admin/ChangeRoleTab")
    .get(ChangeRoleTab)



router
.route("/admin/ChangeRoleTab/add")
.post( addUser);

router
.route('/admin/ChangeRoleTab/update/:id',)
.put( updateUser);

router
.route("/admin/ChangeRoleTab/edit")
.put( editUserInformation);




router
.route("/admin/ChangeRoleTab/delete/:id")
.delete( deleteUser);


export default router;