const bcrypt = require( "bcrypt");
const jwt = require( "jsonwebtoken");
const { Op } = require( "sequelize");
const Users = require( "../models/UserModel.js");


exports.getUsers = async(req, res) => {
    try {
        const users = await getUserList();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

exports.getUsersForAdmin = async(req, res) => {
    try {
        const users = await getUserList(1);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
   
exports.Register = async(req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = password; //await bcrypt.hash(password, salt);
    try {
        const user = await Users.findAll({
            where:{
                email: email
            }
        });
        if(user.length > 0) return res.status(400).json({msg: "Already registered!"});
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registered!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"Invalid Information!"});
    }
}

exports.Login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await Users.findAll({
            where:{
                // [Op.or]: [
                //     { username: username },
                    // { 
                        email: email 
                    // }
                // ]
            }
        });
        if(user.length == 0) return res.status(404).json({msg: "Not register!"});
        // const match = await bcrypt.compare(req.body.password, user[0].password);
        if(password !== user[0].password) return res.status(400).json({msg: "Wrong Password"});

        const userId = user[0].id;
        const name = user[0].username;
        const usertype = user[0].usertype;
        const accessToken = jwt.sign({userId, name, usertype}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({userId, name}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '7d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 1* 60 * 60 * 1000
        });
        if(usertype == 0 || usertype == 1){
            res.json([{ accessToken },user[0]]);
        }
        else return res.status(400).json({msg: "Email tidak ditemukan."});
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Email tidak ditemukan..."});
    }
}

exports.UpdateUser = async(req,res)  =>{
    let data = req.body;
    try {
        await Users.update({
            id              :data.id,
            username        :data.username,
            email           :data.email,
            password        :data.password,
            account_no      :data.account_no,
            api_token       :data.api_token,
            reward          :data.reward,
            reward_stopout  :data.reward_stopout,
            hedge           :data.hedge,
            hedge_stopout   :data.hedge_stopout,
            wallet          :data.wallet,
            investment      :data.investment,
            begin_date      :data.begin_date,
            gross_profit    :data.gross_profit
        },{
            where:{
                id: data.id
            }
        });

        let users = await getUserList(1);
        res.json(users);
    } catch (error) {
        res.status(404).json({msg:"update failure"});
    }
}  

exports.Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(204);

    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;

    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

exports.deleteUser = async(req, res) => {
    try{
        const userid = req.body.id;
        const result = await Users.destroy({
            where:{
                id: userid
            }
        });
        let users = await getUserList(1);
        res.json(users);
    }catch(e){
        console.log(e);
        res.status(404).json({msg:"delete failure"});
    }
}

exports.getAccountsByUserid = async(id) => {
    try {
        const accountIds = await Users.findAll(
            {
                attributes:['reward','hedge', 'api_token'],
                where:{
                    id: id
                },
            },
        );
        
        var arrInfo = [];
        arrInfo[0] = accountIds[0].reward;
        arrInfo[1] = accountIds[0].hedge;
        arrInfo[2] = accountIds[0].api_token;
        
        return arrInfo
    } catch (error) {
        console.log('getAccountsByUserid ='+ error);
        return [];
    }
}

// get 2 metaaccountIds of user
exports.getMetaAccountsByUserid = async(req,res) => {
    try {

        const id  = req.body.params.id;
        const accountIds = await Users.findAll(
            {
                attributes:['reward','hedge'],
                where:{
                    id: id
                },
            },
        );
        
        var arrInfo = [];
        var arrStopout = [];
        arrInfo[0] = accountIds[0].reward;
        arrInfo[1] = accountIds[0].hedge;
        arrStopout[0] = accountIds[0].reward_stopout_level;
        arrStopout[1] = accountIds[0].hedge_stopout_level;
        
        res.json({arrInfo: arrInfo, arrStopout: arrStopout}) ;
    } catch (error) {
        console.log('function getMetaAccountsByUserid error---'+ error);
    }
}

// get all accountIds
exports.getAllAccountIds = async() => {
    try {
        const allAccountsIds = await Users.findAll(
            {
                attributes:['id', 'reward','hedge', 'api_token']
            },
        );
        return allAccountsIds;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getUserList = async(type=0) => {
    // let offset = (Number(req.query.page) - 1) * Number(req.query.limit);
    if (type==1) {
        const users = await Users.findAndCountAll(
            {
                attributes:[
                    'id',
                    'username',
                    'email',
                    'password',
                    'account_no',
                    'api_token',
                    'reward',
                    'reward_stopout',
                    'hedge',
                    'hedge_stopout',
                    'wallet',
                    'investment',
                    'begin_date',
                    'gross_profit'
                ],
                // offset: offset, limit: Number(req.query.limit)
            }
        );
        return users
    }
    const users = await Users.findAndCountAll(
        {
            attributes:[
                'id',
                'username',
                'account_no',
                'reward_stopout',
                'hedge_stopout',
                'wallet',
                'investment',
                'begin_date',
                'gross_profit'
            ],
            // offset: offset, limit: Number(req.query.limit)
        }
    );
    return users
}
  