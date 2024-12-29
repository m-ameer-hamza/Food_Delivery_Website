import appError from "../error.js";
import Order from "../Models/OrderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalBillAmount } = req.body;

    console.log(
      "orderItems",
      orderItems,
      "totalBillAmount",
      totalBillAmount,
      "userEmail",
      req.query.email
    );
    //check if order items are present
    if (!orderItems || orderItems.length === 0 || !totalBillAmount) {
      throw new appError("No order items", 400);
    }
    //check if user email is passed in query
    const userEmail = req.query.email;
    if (!userEmail) {
      throw new appError("User not logged in", 401);
    }

    const order = new Order({
      orderItems: orderItems.map((item) => ({
        menu_id: item._id,
        quantity: item.quantity,
      })),
      totalBillAmount,
      userEmail,
    });

    // Save the order in the database
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getOrders = async (req, res) => {};

export const updateOrderStatus = async (req, res) => {};
