import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };

  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className=" mt-[40px] max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">CRUD Table</h2>
      <input type="search" placeholder="Search..." className="w-full p-2 border border-gray-300 rounded mb-4" />

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingItemId === item.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateItem(item.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItemId(null)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditingItemName(item.name);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;

