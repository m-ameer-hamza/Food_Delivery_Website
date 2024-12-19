import { useEffect } from "react";
import { FaTrashAlt, FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { useSelector } from "react-redux";
import { addItem, removeItem, clearItem } from "../../../Redux/cartSlice.js";
import { useDispatch } from "react-redux";

import { LuCircleMinus } from "react-icons/lu";

function CartTable() {
  const cart = useSelector((state) => state.cart.cartArray);
  const dispatch = useDispatch();

  //Increase Item in Redux when plus clicked
  const incItemHandler = (item) => {
    dispatch(addItem(item));
  };

  //Decrease Item in Redux when minus clicked
  const decItemHandler = (item) => {
    dispatch(removeItem(item._id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className="bg-green text-white rounded-sm">
          <tr className="text-lg font-bold">
            <th>#</th>
            <th>Food</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* row 1 */}
          {cart.map((item, index) => {
            return (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image} // Use `item` instead of cart[0]
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td className="flex items-center gap-6 mt-3">
                  <FaMinus
                    size={16}
                    className="cursor-pointer bg-gray-200 rounded-full"
                    onClick={() => decItemHandler(item)}
                  />
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <TiPlus
                    size={16}
                    className="cursor-pointer bg-gray-200 rounded-full"
                    onClick={() => incItemHandler(item)}
                  />
                </td>
                <td>{item.price}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <FaTrashAlt size={20} color="red" />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
