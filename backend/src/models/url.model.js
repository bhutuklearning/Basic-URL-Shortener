import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
        default: () => shortid.generate(),
    },
    customShortId: {
        type: String,
        unique: true,
        sparse: true
    },
    clicks: [
        {
            timestamp: { type: Date, default: Date.now },
            referrer: { type: String },
            ip: { type: String },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;