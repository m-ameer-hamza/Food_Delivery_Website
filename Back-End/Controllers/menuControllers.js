import appError from "../error.js";
import MenuItems from "../Models/MenuModel.js";
export const getMenuItems = (req, res) => {
  res.status(200).json({
    message: "Success",
    data: [],
  });
};
