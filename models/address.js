const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addresses: [{
        house: {
            type: String,
            required: true
        },
        floor: {
            type: String
        },
        area: {
            type: String,
            required: true
        },
        near: {
            type: String
        },
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        num: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        }
    }]
});

let Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

module.exports = Address;
