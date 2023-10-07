const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const cryptoJS = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: 'customer',
    },
    cart:{
        type:Array,
        default: [],
    },
    address: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Address'
        }
    ],
    wishlist: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    passwordChangeAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (!this.isModified(this.password)) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

userSchema.methods = {
    checkPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    createResetPasswordToken:  function () {
        const resetToken = cryptoJS.randomBytes(32).toString('hex');
        this.passwordResetToken = cryptoJS.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);