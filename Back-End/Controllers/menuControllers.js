import appError from "../error.js";
import MenuItems from "../Models/MenuModel.js";

export const getMenuItems = async (req, res, next) => {
  //Get all the items from the database and send them using pagination 9 items per page

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = await MenuItems.find().limit(limit).skip(startIndex).exec();
    // if (endIndex < (await MenuItems.countDocuments().exec())) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }
    res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (err) {
    console.log(err);
    next(new appError("Error in getting menu items", 400));
  }
};

//get the popular items from the database using the category
export const getPopularItems = async (req, res, next) => {
  //Get the items whose category is popular
  try {
    const popularItems = await MenuItems.find({ category: "popular" });
    res.status(200).json({
      message: "Success",
      data: popularItems,
    });
  } catch (err) {
    console.log(err);
    next(new appError("Error in getting popular items", 400));
  }
};

//get the items from the database by category category
export const getItemsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = await MenuItems.find({ category: category })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (err) {
    console.log(err);
    next(new appError("Error in getting items by category", 400));
  }
};

export const getMenuItemsCount = async (req, res, next) => {
  try {
    const count = await MenuItems.countDocuments();

    res.status(200).json({
      message: "Success",
      count: count,
      pages: Math.ceil(count / 9),
    });
  } catch (err) {
    console.log(err);
    next(new appError("Error in getting menu items count", 400));
  }
};

export const getCategoryCount = async (req, res, next) => {
  //Get the count of items in cateroy passed in the params
  try {
    const category = req.query.category;
    console.log(category);
    const count = await MenuItems.countDocuments({ category: category });
    res.status(200).json({
      message: "Success",
      count: count,
      pages: Math.ceil(count / 9),
    });
  } catch (err) {
    console.log(err);
    next(new appError("Error in getting category count", 400));
  }
};
