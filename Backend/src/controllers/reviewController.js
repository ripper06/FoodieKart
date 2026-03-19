const {ReviewModel} = require('../models')

const addReviews= async(req,res) => {
    try {
        const userId = req.user._id;
        const {recipeId, recipeName, rating, review} = req.body;

        const existingReview = await ReviewModel.findOne({userId,recipeId});

        let result;

        if(existingReview){
            existingReview.rating = rating;
            existingReview.review = review;
            result = await existingReview.save();
        }else {
            result = await ReviewModel.create({
                userId,
                recipeId,
                recipeName,
                rating,
                review
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error adding review"});
    }
};


const getReviews = async(req,res) => {
    console.log(req);
    try{
        const {recipeId} = req.params;

        const reviews = await ReviewModel.find({recipeId})
                              .populate("userId", "name");
        
        const avgRating = reviews.reduce((acc,r) => acc + r.rating,0)/reviews.length || 1;
        
        return res.status(200).json({reviews, avgRating});
    
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Error fetching reviews"});
    }
}

const getAllReviews = async(req,res) => {
    try {
        const reviews = await ReviewModel.find({})
                              .populate("userId", "name")
                              .limit(10);

        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching all reviews"});
    }
}

module.exports ={
    addReviews,
    getReviews,
    getAllReviews
}
