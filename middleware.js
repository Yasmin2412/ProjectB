const Listing=require("./models/listing.js")
module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
      req.session.redirectUrl=req.originalUrl;
      req.flash("error", "You must be logged in to create a listing");
      return res.redirect("/login");
    }
    next();
  };
  module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
  }
  module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
  
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
  
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of listing!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  };