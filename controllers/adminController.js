const bcrypt= require("bcrypt")
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
    try {
        const data = req.body;
        const admin = new Admin(data);
        const salt = await bcrypt.genSalt(10);

        const cryptedPass = await bcrypt.hash(data.password, salt);
        admin.password = cryptedPass;

        const savedAdmin = await admin.save();
        res.status(200).send(savedAdmin );
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.login =async (req, res) => {
    try {
        const data = req.body;
        const admin = await Admin.findOne({ email: data.email });

        if (!admin) {
            res.status(404).send('Email ou mot de passe invalide');
        } else {
            const isValidPass = bcrypt.compareSync(data.password, admin.password);

            if (!isValidPass) {
                res.status(401).send('Email ou mot de passe invalide !');
            } else {
                const payload = {
                    _id: admin.id,
                    email: admin.email,
                    name: admin.name
                };
                const token = jwt.sign(payload, '123456');
                res.status(200).send({ mytoken: token ,admin });
            }
        }
    } catch (err) {
        res.status(500).send('Erreur interne du serveur');
    }
}