import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>
        <X />
      </button>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      {children}
    </motion.div>
  </div>
);

export default Modal;
