export default function ComplaintForm({ formData, setFormData, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      complaint_source: "",
      customer_name: "",
      product_name: "",
      product_strength: "",
      batch_number: "",
      manufacturing_date: "",
      expiry_date: "",
      quantity: "",
      description: "",
      initial_severity: "",
      suggested_action: "",
      written_assessment: "",
    });
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    marginTop: "4px"
  };

  const readOnlyStyle = {
    ...inputStyle,
    backgroundColor: "#f8fafc",
    color: "#334155",
    borderColor: "#e2e8f0"
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569"
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
      border: "1px solid #e2e8f0",
      padding: "28px",
      fontFamily: "Inter, system-ui, sans-serif"
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Customer Complaint</h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>Complaint Registration Form</p>
        </div>

        <span style={{
          backgroundColor: "#fef3c7",
          color: "#b45309",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.025em"
        }}>
          ● Pending
        </span>
      </div>

      {/* Grid Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Complaint Source</label>
          <select
            name="complaint_source"
            value={formData.complaint_source || ""}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Source</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Website">Website</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label style={labelStyle}>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter product"
          />
        </div>

        <div>
          <label style={labelStyle}>Product Strength</label>
          <input
            type="text"
            name="product_strength"
            value={formData.product_strength || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. 500 mg"
          />
        </div>

        <div>
          <label style={labelStyle}>Batch Number</label>
          <input
            type="text"
            name="batch_number"
            value={formData.batch_number || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. B12345"
          />
        </div>

        <div>
          <label style={labelStyle}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity || ""}
            onChange={handleChange}
            style={inputStyle}
            placeholder="0"
          />
        </div>

        <div>
          <label style={labelStyle}>Manufacturing Date</label>
          <input
            type="date"
            name="manufacturing_date"
            value={formData.manufacturing_date || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={formData.expiry_date || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Description */}
      <div style={{ marginTop: "20px" }}>
        <label style={labelStyle}>Complaint Description</label>
        <textarea
          rows={4}
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          placeholder="Describe the complaint in detail..."
        ></textarea>
      </div>

      {/* AI Assessment Section */}
      <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1d4ed8", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }}>
          🤖 AI Assessment
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Initial Severity</label>
            <input
              type="text"
              value={formData.initial_severity || ""}
              readOnly
              placeholder="Auto-generated by AI"
              style={readOnlyStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Suggested Action</label>
            <textarea
              value={formData.suggested_action || ""}
              readOnly
              rows={2}
              placeholder="Auto-generated by AI"
              style={{ ...readOnlyStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <div>
            <label style={labelStyle}>Written Assessment</label>
            <textarea
              value={formData.written_assessment || ""}
              readOnly
              rows={4}
              placeholder="Auto-generated by AI"
              style={{ ...readOnlyStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#f1f5f9",
            color: "#475569",
            border: "1px solid #cbd5e1",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onSave}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
            transition: "all 0.2s"
          }}
        >
          Save Complaint
        </button>
      </div>
    </div>
  );
}