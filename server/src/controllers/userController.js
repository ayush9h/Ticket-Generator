const prisma = require("../prisma/client")


exports.createUser = async(req,res) =>{
    const {
        userId,
        userMail,
        userName,
    } = req.body;

    try{
        const user = await prisma.user.create({
            data:{
                userId,
                userMail,
                userName,
            },
        });

        res.status(201).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json(
            {
                error:"There was an error while creating the user"
            }
        )
    }
};
