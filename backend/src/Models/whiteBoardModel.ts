import mongoose , {Schema} from "mongoose";

const whiteboardSchema = new Schema({
  title: {
    type: String
  },
  uuid: {
    type: String,
    unique: true,
  },
  canvasComponents: [Schema.Types.Mixed],
}, {
  timestamps: true
});

export default mongoose.model("whiteboards", whiteboardSchema);
