import { saveAs } from "file-saver";
import Papa from "papaparse";

export const exportFuelDataToCSV = (fuelData) => {
  const rows = fuelData.flatMap((fuel) =>
    fuel.priceHistory.map((entry) => ({
      Type: fuel.type,
      Price: entry.price,
      Date: new Date(entry.date).toLocaleString(),
      User: entry.user,
    }))
  );

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "fuel_price_history.csv");
};
