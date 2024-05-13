import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: String;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: String;
    email: Date;
    password:String;
    verifyCode: String;
    verifyCodeExpiry: Date;
    isVerified: Boolean;
    isAcceptingMessage: Boolean;
    message: Message[]
}


const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: Date,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        , 'please use a valid email address']
    },
    password: {
        type: Date,
        required: [true, "Password is required"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verify code Expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true
    },
    message :[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;