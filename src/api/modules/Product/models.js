import ProductSchema from './schemas';

export default class Product {
  getProductsPagination(limit, offset) {
    return new Promise((resolve, reject) => {
      let query = {};
      if (offset === 0) {
        query = {uid: {$gte: offset}};
      } else {
        query = {uid: {$lt: offset}};
      }
      return ProductSchema.find(query, {}, {
        limit: limit,
        sort: {uid: -1}
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

  getNextPageFlag(uid) {
    return new Promise((resolve, reject) => {
      return ProductSchema.count({uid: {$lt: uid}}, (err, flag) => {
          if (err) {
            reject(err);
          }
          resolve(flag);
        }
      );
    });
  }

  getProduct(uid) {
    return new Promise((resolve, reject) => {
      return ProductSchema.findOne({uid}).then((res) => resolve(res)).catch((err) => reject(err));
    });
  }

  addProduct({title, description, price, properties, sku, shortDescription}) {
    return new Promise(async (resolve, reject) => {
      let maxItem = await ProductSchema.find({uid: {$gte: 0}}).sort('-uid').limit(1);
      let uid = (maxItem && maxItem.length > 0) ? maxItem[maxItem.length - 1].uid + 1 : 0;
      const product = new ProductSchema({
        uid,
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

  deleteProduct(uid) {
    return new Promise((resolve, reject) => {
      return ProductSchema.remove({uid}).then((res) => {
        return resolve(res);
      }).catch((err) => reject(err));
    });
  }

  editProduct({uid, title, description, price}) {
    return new Promise((resolve, reject) => {
      return ProductSchema.findOneAndUpdate({uid}, {
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