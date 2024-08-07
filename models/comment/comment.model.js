const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    USER_ID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    CONTENT: {
        type: String,
        required: true
    },
    FROM_DATE: {
        type: Date,
        default: Date.now
    },
    THRU_DATE: {
        type: Date,
        default: null
    },
    IS_DELETED: {
        type: Boolean,
        default: false
    }
});

// Định nghĩa schema 
const CommentSchema = new Schema({
    USER_ID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ORGANIZATION_ID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    LIST_COMMENT: [{
        USER_ID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        CONTENT: {
            type: String,
            required: true
        },
        ATTACHMENTS: [{
            url: String,
            description: String
        }],
        FROM_DATE: {
            type: Date,
            default: Date.now
        },
        THRU_DATE: {
            type: Date,
            default: null
        },
        IS_DELETED: {
            type: Boolean,
            default: false
        },
        REPLIES: [ReplySchema]
    }],
    PRODUCT_ID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    LIST_COMMENT_MAX_NUMBER: {
        type: Number,
        required: true,
        default: 10
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
