const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingContoller = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
// Index Route
.get( wrapAsync(listingContoller.index))
//Create Route
.post(isLoggedIn, upload.single('listing[image]'), validateListing,
    wrapAsync(listingContoller.createListing)
);

//New Route
router.get("/new", isLoggedIn,listingContoller.renderNewForm);

router.route("/:id")
//Show Route
.get( wrapAsync(listingContoller.showListing))
//Update Route
.put(isLoggedIn, isOwner, 
    upload.single('listing[image]'), validateListing, 
    wrapAsync( listingContoller.updateListing))
//Delete Route    
.delete( isLoggedIn, isOwner, 
    wrapAsync( listingContoller.destroyListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn,  wrapAsync( listingContoller.renderEditForm));

module.exports = router;