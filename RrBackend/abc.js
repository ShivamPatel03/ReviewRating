    IsUser = async (req, res, next) => {
    if (req.user.role === 'user') {
        next();
    }
    return res.status(401).send("Unauthorized!");   
}

   IsAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    }
    return res.status(401).send("Unauthorized!");

}


// Auth user only
router.get('/events', verifyUserToken, IsUser, userController.userEvent);  //verifyToken - Authentication 
                                                                           //isUSer = Authorization 

// Auth Admin only
router.get('/special', verifyUserToken, IsAdmin, userController.adminEvent);
