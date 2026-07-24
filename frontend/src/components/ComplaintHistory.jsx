export default function ComplaintHistory({ complaints }) {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
      border: "1px solid #e2e8f0",
      padding: "28px",
      marginTop: "24px",
      fontFamily: "Inter, system-ui, sans-serif"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
          Complaint History
        </h2>

        <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", backgroundColor: "#f1f5f9", padding: "4px 12px", borderRadius: "12px" }}>
          Total: {complaints.length}
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0", borderTopLeftRadius: "8px" }}>ID</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0" }}>Customer</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0" }}>Product</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0" }}>Batch</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>Status</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>Created</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e2e8f0", textAlign: "right", borderTopRightRadius: "8px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "14px" }}
                >
                  No complaints registered yet.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr
                  key={item.id}
                  style={{ transition: "background-color 0.2s" }}
                >
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b", borderBottom: "1px solid #f1f5f9", fontWeight: "600" }}>
                    #{item.id}
                  </td>

                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#0f172a", borderBottom: "1px solid #f1f5f9", fontWeight: "500" }}>
                    {item.customer_name || "-"}
                  </td>

                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#334155", borderBottom: "1px solid #f1f5f9" }}>
                    {item.product_name || "-"}
                  </td>

                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#475569", borderBottom: "1px solid #f1f5f9", fontFamily: "monospace" }}>
                    {item.batch_number || "-"}
                  </td>

                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      {item.status || "Open"}
                    </span>
                  </td>

                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", textAlign: "right" }}>
                    <button
                      style={{
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        border: "1px solid #bfdbfe",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onClick={() =>
                        alert(
                          `Complaint ID: ${item.id}\nCustomer: ${item.customer_name}\nProduct: ${item.product_name}\nBatch: ${item.batch_number}\nStatus: ${item.status}`
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}