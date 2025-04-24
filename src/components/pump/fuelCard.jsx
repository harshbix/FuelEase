import React from "react";
import { format } from "date-fns";
import { TrendingUp, History } from "lucide-react";
import { motion } from "framer-motion";

const FuelCard = ({ fuel, onEdit, onSchedule }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition space-y-6"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        {fuel.type}
      </h3>
      <div className="flex space-x-3">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg shadow transition-all duration-300"
          onClick={() => onEdit(fuel)}
        >
          Edit Price
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-500 text-white text-xs px-4 py-2 rounded-lg shadow transition-all duration-300"
          onClick={() => onSchedule(fuel)}
        >
          Schedule Change
        </button>
      </div>
    </div>
    <div>
      <p className="text-4xl font-extrabold text-gray-900">{fuel.currentPrice}</p>
      <p className="text-sm text-gray-500">Current Price</p>
    </div>
    {fuel.scheduledChanges.length > 0 && (
      <div>
        <h4 className="text-sm font-semibold text-gray-700">Scheduled Changes</h4>
        {fuel.scheduledChanges.map((change, idx) => (
          <div key={idx} className="flex justify-between text-sm text-gray-900">
            <p>{change.price}</p>
            <p>{format(new Date(change.date), "yyyy-MM-dd HH:mm")}</p>
          </div>
        ))}
      </div>
    )}
    <div>
      <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        <History className="w-4 h-4 text-gray-700" /> Price History
      </h4>
      {fuel.priceHistory.length > 0 ? (
        fuel.priceHistory.map((history, idx) => (
          <div key={idx} className="flex justify-between text-sm text-gray-500">
            <p>{history.price}</p>
            <p>{format(new Date(history.date), "yyyy-MM-dd HH:mm")}</p>
            <p>{history.user}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No history available</p>
      )}
    </div>
  </motion.div>
);

export default FuelCard;
