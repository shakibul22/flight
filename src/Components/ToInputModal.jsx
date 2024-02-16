import React, { useState } from "react";

const ToInputModal = () => {
  const [input2, setInput2] = useState("");
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <p onClick={() => document.getElementById("my_modal_1").showModal()}>
        {" "}
        <input
          type="text"
          placeholder="To"
          className="border-2 w-[15wh] h-12 p-4"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </p>
      
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ToInputModal;
