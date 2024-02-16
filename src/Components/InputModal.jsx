import React, { useState } from "react";

const InputModal = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <p onClick={() => document.getElementById("my_modal_2").showModal()}>
        {" "}
        <input
          type="text"
          placeholder="From"
          className="border-2 w-[15wh] h-12 p-3"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </p>
      <dialog id="my_modal_2" className="modal">
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

export default InputModal;
