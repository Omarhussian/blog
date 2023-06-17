import React, { useContext } from "react";
import { PopupContext } from "../../Context/PopupContext";
import { deleteCall } from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const DeletePopup = ({ id }) => {
  const { hidePopup } = useContext(PopupContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const _handleDelete = () => {
    dispatch(deleteCall({ path: `/posts/${id}` }))
      .unwrap()
      .then((resp) => {
        if (resp && resp.resp.status === 200) {
          enqueueSnackbar("Success", { variant: "success" });
          hidePopup();
        } else {
          console.log(resp);
          enqueueSnackbar("Something went wrong, please try again", {
            variant: "error",
          });
        }
      });
  };

  return (
    <div className="py-6 px-6">
      <h2 className="text-xl font-semibold mb-4">
        Are you sure you want to delete this blog?
      </h2>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          onClick={_handleDelete}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
          onClick={hidePopup}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
