import mongoose from 'mongoose';

const productPropertySchema = mongoose.Schema({
  productProperty: Number,
  propertyValue: String,
  unit: Number
});

const productSchema = mongoose.model(
  'Product',
  mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    price: Number,
    sku: String,
    properties: [productPropertySchema],
    createdAt: Date,
    uid: Number
  })
);
export default productSchema;
