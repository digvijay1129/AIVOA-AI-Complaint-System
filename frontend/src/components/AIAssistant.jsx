import { useState, useRef, useEffect } from "react";
import api, {
    askAI,
    extractComplaintFromText,
    updateComplaintFields,
} from "../api";

export default function AIAssistant({ formData, setFormData }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("🤖 AI Ready");
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Ref attached directly to the chat container element
    const chatContainerRef = useRef(null);

    // 2. Safely scroll ONLY the container to the bottom when messages or loading states change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Please select a PDF first.");
            return;
        }

        const payload = new FormData();
        payload.append("file", selectedFile);

        try {
            setMessage("⏳ Processing PDF with AI...");

            const res = await api.post("/upload", payload);

            setMessage("✅ PDF processed successfully");

            if (res.data && res.data.data) {
                setFormData(res.data.data);
            }

            setChatHistory((prev) => [
                ...prev,
                {
                    role: "system",
                    text: `📄 ${selectedFile.name}`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
                {
                    role: "assistant",
                    text: "✅ Complaint processed successfully.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
        } catch (err) {
            console.error(err);
            setMessage("❌ Upload Failed");
        }
    };

    const sendQuestion = async () => {
        if (!question.trim()) return;

        const userQuestion = question.trim();
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setLoading(true);

        setChatHistory((prev) => [
            ...prev,
            {
                role: "user",
                text: userQuestion,
                time: currentTime,
            },
        ]);

        setQuestion("");

        try {
            const lowerText = userQuestion.toLowerCase();

            const questionWords = [
                "what",
                "who",
                "when",
                "where",
                "why",
                "how",
                "which",
                "?"
            ];

            const isQuestion = questionWords.some(word =>
                lowerText.includes(word)
            );

            const updateKeywords = [
                "batch",
                "batch number",
                "quantity",
                "customer",
                "product",
                "strength",
                "manufacturing",
                "expiry",
                "source",
                "change",
                "update",
                "actually",
                "correct"
            ];

            const hasComplaintData =
                formData.customer_name ||
                formData.product_name ||
                formData.batch_number;

            const isUpdate =
                hasComplaintData &&
                updateKeywords.some(word =>
                    lowerText.includes(word)
                );

            if (isQuestion) {
                const res = await askAI(userQuestion);

                setChatHistory((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text: res.answer,
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
            } else if (isUpdate) {
                const res = await updateComplaintFields(
                    formData,
                    userQuestion
                );

                if (res.updated_fields) {
                    setFormData(prev => ({
                        ...prev,
                        ...res.updated_fields
                    }));
                }

                setChatHistory((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text: "✅ Complaint form updated successfully.",
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
            } else {
                const res = await extractComplaintFromText(userQuestion);

                if (res && res.data) {
                    setFormData(res.data);
                }

                setChatHistory((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text: "✅ Complaint information extracted successfully.",
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
            }

            setLoading(false);
        } catch (err) {
            console.error(err);

            setChatHistory((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "❌ Failed to get AI response.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
            border: "1px solid #e2e8f0",
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            fontFamily: "Inter, system-ui, sans-serif"
        }}>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                        AI Assistant
                    </h2>
                    <span style={{ fontSize: "12px", backgroundColor: "#f1f5f9", color: "#475569", padding: "4px 8px", borderRadius: "6px", fontWeight: "600" }}>
                        v2.0
                    </span>
                </div>
                <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>
                    Upload complaint PDF document
                </p>

                {/* Modern File Dropzone */}
                <div style={{
                    border: "2px dashed #cbd5e1",
                    borderRadius: "12px",
                    padding: "20px 16px",
                    textAlign: "center",
                    backgroundColor: "#f8fafc",
                    transition: "all 0.2s ease"
                }}>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        id="pdf-upload"
                        style={{ display: "none" }}
                    />
                    <label 
                        htmlFor="pdf-upload" 
                        style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#334155",
                            cursor: "pointer",
                            marginBottom: "12px",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                        }}
                    >
                        📁 {selectedFile ? selectedFile.name : "Choose PDF File"}
                    </label>

                    <div>
                        <button
                            onClick={uploadFile}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "none",
                                padding: "8px 20px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "background-color 0.2s"
                            }}
                        >
                            Upload & Process
                        </button>
                    </div>
                </div>

                <div style={{
                    marginTop: "12px",
                    backgroundColor: "#f1f5f9",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#334155",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    {message}
                </div>
            </div>

            {/* Chat Container */}
            <div style={{ marginTop: "24px", flex: 1, display: "flex", flexDirection: "column", minHeight: "350px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#334155", marginBottom: "10px", margin: "0 0 10px 0" }}>
                    AI Copilot Chat
                </h3>

                <div 
                    ref={chatContainerRef}
                    style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        height: "300px",
                        overflowY: "auto",
                        padding: "16px",
                        backgroundColor: "#f8fafc",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >
                    {chatHistory.length === 0 ? (
                        <div style={{ margin: "auto", textAlign: "center", color: "#94a3b8", fontSize: "13px", maxWidth: "220px" }}>
                            💬 Ask questions about this complaint or paste raw complaint text directly.
                        </div>
                    ) : (
                        <>
                            {chatHistory.map((chat, index) => {
                                const isUser = chat.role === "user";
                                const isSystem = chat.role === "system";

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: isUser ? "flex-end" : "flex-start",
                                            marginBottom: "4px"
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: "85%",
                                            borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                                            padding: "10px 14px",
                                            fontSize: "13px",
                                            lineHeight: "1.4",
                                            backgroundColor: isUser 
                                                ? "#2563eb" 
                                                : isSystem 
                                                ? "#fef3c7" 
                                                : "#ffffff",
                                            color: isUser 
                                                ? "#ffffff" 
                                                : isSystem 
                                                ? "#92400e" 
                                                : "#1e293b",
                                            border: isUser || isSystem ? "none" : "1px solid #e2e8f0",
                                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                        }}>
                                            <div>{chat.text}</div>
                                            <div style={{
                                                fontSize: "10px",
                                                marginTop: "4px",
                                                textAlign: "right",
                                                opacity: 0.75
                                            }}>
                                                {chat.time}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {loading && (
                                <div style={{ color: "#64748b", fontSize: "12px", fontStyle: "italic", display: "flex", alignItems: "center", gap: "6px" }}>
                                    🤖 AI is typing...
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Input Controls */}
                <div style={{ display: "flex", marginTop: "12px", gap: "8px" }}>
                    <input
                        type="text"
                        placeholder="Ask a question or paste text..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendQuestion();
                            }
                        }}
                        style={{
                            flex: 1,
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            padding: "10px 14px",
                            fontSize: "13px",
                            outline: "none",
                            boxSizing: "border-box"
                        }}
                    />

                    <button
                        onClick={sendQuestion}
                        style={{
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}