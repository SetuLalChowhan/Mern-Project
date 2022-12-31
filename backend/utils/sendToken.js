// const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();
//     res.status(statusCode).json({
//         success: true,
//         user,
//         token,
//     });
// };

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    //option for cookie

    

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
