import { FaTrashAlt, FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  incItemQuantity,
  decItemQuantity,
  removeItem,
} from "../../../Redux/cartSlice.js";
import { useDispatch } from "react-redux";

function CartTable() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Increase Item in Redux when plus clicked
  const incItemHandler = (item) => {
    dispatch(incItemQuantity(item));
  };

  //Decrease Item in Redux when minus clicked
  const decItemHandler = (item) => {
    dispatch(decItemQuantity(item._id));
  };

  //Remove Item in Redux when trash icon clicked
  const removeItemHandler = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Item has been delted",
          icon: "success",
        });
        dispatch(removeItem(item._id));
      }
    });
  };
  const priceCalc = (item) => {
    return Math.round(item.price * item.quantity);
  };

  return (
    <>
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
            {cart.cartArray.map((item, index) => {
              return (
                <tr
                  key={item._id || index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
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
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <TiPlus
                      size={16}
                      className="cursor-pointer bg-gray-200 rounded-full"
                      onClick={() => incItemHandler(item)}
                    />
                  </td>
                  <td>Rs. {priceCalc(item)}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        removeItemHandler(item);
                      }}
                    >
                      <FaTrashAlt size={20} color="red" />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Customer Details */}
      <div className="my-16 flex flex-col md:flex-row gap-9 justify-between">
        <div className="md:w-1/3 space-y-5">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="md:w-1/3 space-y-5 flex flex-col">
          <h3 className="font-medium">Delivery Details</h3>
          <p>Address: Ameer Hamza</p>
          <p>Phone: Ameer Hamza@gmail.com</p>
          <p>Payment Mode: Online</p>
          <button className="btn btn-green w-1/2 self-center">
            Change Address
          </button>
        </div>
        <div className="md:w-1/3 space-y-5 flex flex-col">
          <h3 className="font-medium">Shopping Details</h3>
          <p className="">Total Items: {cart.totalItems}</p>
          <p className="">Delivery Charges: 100</p>
          <p className="text-lg font-bold text-rose-500">
            Total Payable Amount: Rs. {cart.total + 100}
          </p>

          <button className="btn bg-green w-1/2 self-end">Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartTable;
