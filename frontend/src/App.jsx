import { useState, useEffect } from "react";
import api, { saveComplaint, getComplaints } from "./api";
import ComplaintForm from "./components/ComplaintForm";
import AIAssistant from "./components/AIAssistant";
import ComplaintHistory from "./components/ComplaintHistory";

function App() {
  const [formData, setFormData] = useState({
    complaint_source: "",
    customer_name: "",
    customer_email: "",
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

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log("Backend Connected");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveComplaint = async () => {
    try {
      const res = await saveComplaint(formData);

      alert("✅ Complaint Saved Successfully!");

      console.log(res);

      loadComplaints();
    } catch (error) {
      console.error(error);

      alert("❌ Failed to save complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8 space-y-5">
          <ComplaintForm
            formData={formData}
            setFormData={setFormData}
            onSave={handleSaveComplaint}
          />

          <ComplaintHistory complaints={complaints} />
        </div>

        <div className="col-span-4">
          <AIAssistant formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default App;