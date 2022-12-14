const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");
const router = require("express").Router();


// CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedcart = await newCart.save();
        res.status(201).json(savedcart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {


    try {
        const UpdatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(UpdatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json("cart has been deleted...");
    } catch (error) {
        res.status(500).json(error)
    }
})

// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.status(200).json("Product has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

// GET User CART

router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET ALL 

router.get("/", verifyTokenAndAdmin, async (_req, res) => {
    
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
