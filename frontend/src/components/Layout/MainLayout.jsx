import ComplaintForm from "../ComplaintForm/ComplaintForm";
import AIAssistant from "../AIAssistant/AIAssistant";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-2 gap-6">

        <ComplaintForm />

        <AIAssistant />

      </div>
    </div>
  );
}