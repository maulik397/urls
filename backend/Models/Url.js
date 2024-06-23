const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const crypto = require('crypto');


const urlSchema = new Schema ({
    originalUrl: { 
        type: String,
        required: true 
    },
    shortUrl: {
        type: String,
        unique: true 
    },
    customAlias: {
         type: String,
        
     },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clickCount: { 
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
     
    }
})
urlSchema.pre('save', async function(next) {
    if (!this.shortUrl) {
        this.shortUrl = generateRandomString(7); 
        // Check if the generated short URL is unique, if not, regenerate
        while (await this.constructor.findOne({ shortUrl: this.shortUrl })) {
            this.shortUrl = generateRandomString(7); 
        }
    }
    next();
});
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') 
        .slice(0, length); // Trim to desired length
}


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
