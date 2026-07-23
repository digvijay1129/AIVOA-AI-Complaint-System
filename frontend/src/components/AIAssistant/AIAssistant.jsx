import UploadBox from "../Upload/UploadBox";
import ChatWindow from "../Chat/ChatWindow";

export default function AIAssistant() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        AI Complaint Assistant
      </h2>

      <UploadBox />

      <ChatWindow />

    </div>
  );
}