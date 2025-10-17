const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const optionControler = require("../controllers/options.js");
const { isLoggedIn, isOwner, validListing } = require("../middleware.js");
const Listing = require("../models/listing.js");

router.get("/trend" , isLoggedIn ,validListing, wrapAsync(optionControler.optioncheck));
router.get("/rooms" , isLoggedIn ,validListing, wrapAsync(optionControler.roomOption));
router.get("/mountains" , isLoggedIn ,validListing, wrapAsync(optionControler.mountainsOption));
router.get("/pools" , isLoggedIn ,validListing, wrapAsync(optionControler.poolsOption));
router.get("/boats" , isLoggedIn ,validListing, wrapAsync(optionControler.boatsOption));
module.exports = router;