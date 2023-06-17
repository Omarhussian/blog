import React, { useState , useContext } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { PopupContext } from '../../Context/PopupContext'
import EditPopup from "../popups/EditPopup";
import DeletePopup from "../popups/DeletePopup";
const BlogCard = ({ data,getBlogs }) => {
  const [expanded, setExpanded] = useState(false);
  const { showPopup } = useContext(PopupContext)
  const _handleEdit = () => { 
    showPopup(<EditPopup getBlogs = {getBlogs} data={data}/>)
  }
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const _handleDelete = () => {
    showPopup(<DeletePopup id={data.id} />)
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg w-80 mt-2 ${expanded ? "h-auto" : "h-64"}`}>
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
          <p className={`overflow-hidden ${expanded ? "" : "h-20"}`}>{data.body}</p>
        </div>
        {!expanded && (
          <div className="flex items-center justify-between mt-2">
            <button
              className="text-blue-500 font-semibold hover:underline focus:outline-none"
              onClick={toggleExpansion}
            >
              See More
            </button>
            <div className="flex">
              <TrashIcon onClick={_handleDelete} className="h-6 w-6 text-red-500 cursor-pointer" />
              <PencilIcon onClick={_handleEdit} className="h-6 w-6 text-blue-500 cursor-pointer ml-2" />
            </div>
          </div>
        )}
      </div>
      {expanded && (
        <div className="px-6 pb-4">
          <p>{data.body}</p>
          <button
            className="mt-2 text-blue-500 font-semibold hover:underline focus:outline-none"
            onClick={toggleExpansion}
          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
