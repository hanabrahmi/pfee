import jwt from "jsonwebtoken"
export const shouldBeLoggedIn = async (req,res) => {
    const token = req.cookies.token 
    if(!token)
        return res.status(401).json({message: "Noy Authnticated!"});
    jwt.verify(token, process.env.JWT_SECRET_Key , async (err, payload) => {
        if (err) res.status(403).json({message: "Token is not Valid !"});
    })
    res.status(200).json({message : "You are Authenticated"});
}
export const shouldBeAdmin = async (req, res ) => {

}