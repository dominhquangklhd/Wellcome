/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/* global Product */

module.exports = {
  // GET /api/products
  find: async function (req, res) {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Product.count({
      where: { name: { contains: search } },
    });

    const products = await Product.find({
      where: { name: { contains: search } },
    }).skip(skip).limit(limit);

    return res.json({ total, products });
  },

  // GET /api/products/:id
  findOne: async function (req, res) {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.notFound();
    return res.json(product);
  },

  // POST /api/products
  create: async function (req, res) {
    const { name, price } = req.body;
    const newProduct = await Product.create({ name, price }).fetch();
    return res.status(201).json(newProduct);
  },

  // PUT /api/products/:id
  update: async function (req, res) {
    const { name, price } = req.body;
    const updatedProduct = await Product.updateOne({ id: req.params.id }).set({
      name,
      price,
    });
    if (!updatedProduct) return res.notFound();
    return res.json(updatedProduct);
  },

  // DELETE /api/products/:id
  delete: async function (req, res) {
    const deletedProduct = await Product.destroyOne({ id: req.params.id });
    if (!deletedProduct) return res.notFound();
    return res.json({ message: "Deleted successfully" });
  },
};
