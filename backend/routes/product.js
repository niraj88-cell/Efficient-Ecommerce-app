const Product = require("../models/Product");
const { verifyToken } = require("./VerifyToken");
const router = require("express").Router();
const mongoose = require('mongoose');
const express = require('express');

// Add a new product
router.post("/", verifyToken, async (req, res) => {
  if (req.user.id === req.body.userId || req.user.isAdmin) {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      console.error('Error saving product:', err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not authorized to add a product" });
  }
});

// Update a product
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.body.userId || req.user.isAdmin) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not authorized to update this product" });
  }
});

// Delete a product
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.body.userId || req.user.isAdmin) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  } else {
    res.status(403).json({ message: "You are not authorized to delete this product" });
  }
});

// Get a single product by ID
router.get('/find/:id', verifyToken, async (req, res) => {
    const productId = req.params.id;
  
    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });
  


  // Get all products or filter by category
router.get('/find', verifyToken, async (req, res) => {
    const category = req.query.category;
  
    try {
      let products;
  
      // Fetch all products or filter by category
      if (!category || category === 'all') {
        products = await Product.find();
      } else {
        products = await Product.find({ categories: category });
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });

module.exports = router;
