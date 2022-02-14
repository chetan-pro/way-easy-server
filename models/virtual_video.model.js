const mongoose = require('mongoose');
const { Schema } = mongoose;

const virtualVideos = new Schema({
    client_space_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientSpaces',
    },
    video_url: {
        type: String,
    },
});



const VirtualVideos = mongoose.model("virtualVideos", virtualVideos);
module.exports = VirtualVideos;