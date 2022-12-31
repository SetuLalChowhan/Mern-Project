const express = require("express");
const {
    createUser,
    loginUser,
    logOut,
    getAllUser,
    getSingleUser,
    updateUserProfile,
    updateRole,
    deleteUser,
} = require("../controller/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/allUsers", isAuthenticated, authorizeRoles("admin"), getAllUser);
router.get("/user/:id", isAuthenticated, authorizeRoles("admin"), getSingleUser);
router.put("/updateMe", isAuthenticated, updateUserProfile);
router.put("/updateRole/:id", isAuthenticated, authorizeRoles("admin"), updateRole);
router.delete("/deleteUser/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
