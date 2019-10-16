Product = require('../models/productModel');
ProductSize = require('../models/productSizeModel');
Size = require('../models/sizeModel');
ProductTags = require('../models/productTagsModel');

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

exports.getAllProducts = function(req, res){
    Product.find({active: true}, async function (err, product) {
        if (err) {
            res.send(err);
        }
        else {
            var data = [];
            /* const datas = products.map(async (product) => {
                return await Product.findOne({id_product: product._id}, function(err, productSize){
                    if(err){
                        console.log(err);
                    }
                    else{
                        return productSize;
                    }
                });
              });

              const resolvedProductSizes = await Promise.all(datas);
              const onlyEvent = resolvedProductSizes.filter(n => n);
              console.log("DATAS : " + resolvedProductSizes); */
            for(let i=0; i<product.length;i++){


                
                console.log("product 0 = " + product[0]);
                console.log("getProductSizes = " + getProductSizes(product[0]));
                console.log("getProductSizes = " + await getProductSizes(product[0]));
                var productSizes = await getProductSizes(product[i]);
                if (productSizes) {
                    for(let j=0; j<productSizes.length;j++){
                        var sizes = getSizes(productSizes);
                    }
                    var oneProduct = new Object({ product: product[i], sizes: sizes});
                    await console.log(oneProduct);
                    data.push(oneProduct);
                }
            }
            await console.log(data);
            res.json(data);
        }
    }).sort({viewed_times: -1});
};

async function getProductSizes(product){
    await ProductSize.find({id_product: product._id}, function(err, productSize){
        if(err){
            console.log(err);
        }
        else{
            console.log("DANS GET PRODUCT SIZES : " + productSize);
            return productSize.id_size;
        }
    });
};

async function getSizes(productSizes){
    Size.find({_id: productSizes.id_size}, function(err,size){
        if(err){
            console.log(err);
        }
        else{
            return size;
        }
    })
}

exports.getProduct = function(req, res){
    Product.findOne({_id: req.params.productId}, function(err, product){
        if (err) {
            res.send(err);
        }
        else {
            res.json(product);
        }
    });
};

exports.createProduct = function(req, res){
    var newProduct = new Product(req.body);
    newProduct.save(function(err,product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.addSizeToProduct = function(req, res){
    var newProductSize = new ProductSize(req.body);
    newProductSize.save(function(err,productSize){
        if(err){
            res.send(err);
        }
        else{
            res.json(productSize);
        }
    });
};

exports.addTagsToProduct = function(req, res){
    var newProductTag = new ProductTags(req.body);
    newProductTag.save(function(err,productTag){
        if(err){
            res.send(err);
        }
        else{
            res.json(productTag);
        }
    });
};

exports.productViewed = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { $inc: { viewed_times: 1}}, function (err, product) {
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.disableProduct = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { active: false }, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.updatePicture = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { picture: req.body.picture}, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.activateProduct = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { active : true}, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};