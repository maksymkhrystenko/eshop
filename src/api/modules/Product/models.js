import ProductSchema from './schema-mongo';

export default class ModelClass {
  getProductsPagination(limit, offset) {
    return new Promise((resolve, reject) => {
      let query = {};
      if (offset === 0) {
        query = {id: {$gte: offset}};
      } else {
        query = {id: {$lt: offset}};
      }
      return ProductSchema.find(query, {}, {
        limit: limit,
        sort: {id: -1}
      }).then((res) => resolve(res)).catch((err) => reject(err));
    });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      return ProductSchema.find({}, {}, {
        sort: '-title'
      }).then((res) => resolve(res)).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  getTotal() {
    return new Promise((resolve, reject) => {
      return ProductSchema.count({}, (err, count) => {
        if (err) {
          reject(err);
        }
        resolve(count);
      });
    });
  }

  getNextPageFlag(id) {
    return new Promise((resolve, reject) => {
      return ProductSchema.count({id: {$lt: id}}, (err, flag) => {
          if (err) {
            reject(err);
          }
          resolve(flag);
        }
      );
    });
  }

  getProduct(id) {
    return new Promise((resolve, reject) => {
      return ProductSchema.findOne({id}).then((res) => resolve(res)).catch((err) => reject(err));
    });
  }

  addProduct({title, description, price, properties, sku, shortDescription}) {
    return new Promise(async (resolve, reject) => {
      let maxItem = await ProductSchema.find({id: {$gte: 0}}).sort('-id').limit(1);
      let id = (maxItem && maxItem.length > 0) ? maxItem[maxItem.length - 1].id + 1 : 0;
      const product = new ProductSchema({
        id,
        title,
        description,
        sku,
        shortDescription,
        properties,
        price,
        createdAt: new Date()
      });
      return product.save().then((res) => resolve(res)).catch((err) => reject(err));
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      return ProductSchema.remove({id}).then((res) => {
        return resolve(res);
      }).catch((err) => reject(err));
    });
  }

  editProduct({id, title, description, price}) {
    return new Promise((resolve, reject) => {
      return ProductSchema.findOneAndUpdate({id}, {
        $set: {
          'title': title,
          'description': description,
          'price': price
        }
      }).then((res) => {
        return resolve(res);
      }).catch((err) => reject(err));
    });
  }
}
