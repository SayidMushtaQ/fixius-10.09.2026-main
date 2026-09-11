import mongoose, { Document, Model, Schema, model, models } from "mongoose";

interface FilterType extends Document {
    userId: mongoose.Types.ObjectId;
    distance: string;
    pin_code?: string;
    address?: string;
    categories: string[];
}

const FilterSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        distance: { type: String },
        pin_code: { type: String },
        address: { type: String },
        categories: [{ type: String }]
    },
    { timestamps: true }
);

type TypeFilter = Model<FilterType>;
const Filter: TypeFilter =
    models.Filter as TypeFilter ?? model<FilterType>("Filter", FilterSchema);

export default Filter;
