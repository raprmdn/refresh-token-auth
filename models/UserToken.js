import moongose from "mongoose";

const Schema = moongose.Schema;

const UserTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
});

const UserToken = moongose.model('UserToken', UserTokenSchema);

export default UserToken;