import { getTransaction } from "@api/transaction";

export const fetchTransaction = async () => {
  try {
    const response = await getTransaction();

    const transactions = response.map((item, index) => ({
      sku: item.transactionNo,
      timestamp: new Date(item.createdAt),
      method: item.bankCode,
      type: item.transactionStatus || "unknown",
      status: item.responseCode === "00" ? "Thành công" : "Thất bại",
      amount: item.amount,
      id: item._id,
      order_id: item.order_id,
    }));

    return transactions;
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    throw error; 
  }
};
