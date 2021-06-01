import jwt from 'jsonwebtoken';

//middleware usally has this type of function: do something and then move to ...

//click the LIKE button -> auth middleware (checks if valid and does next()) => like controller

//check if JWT token is valid!
const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        // our token is smaller than 500 characters, googleTokens are longer than 500!
        const isCustomAuth = token.length < 500;

        let decodedData;

        //verifies if JWT matches!
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');    //takes our token with the previously given secret!
            req.userId = decodedData.id;       //stores the decoded ID from the token in the userID??? (decodedData?.id)
        } 
        else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;      //sub is used by google to differentiate every single user!
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;