from typing import TypedDict
from langgraph.graph import StateGraph, END

from app.services.groq_service import (
    extract_complaint_data,
    ask_complaint_question,
    update_complaint_fields,
)


class ComplaintState(TypedDict):
    request_type: str
    input_text: str
    current_data: dict
    result: dict


# -------------------------
# Router Node & Routing Logic
# -------------------------
def router_node(state: ComplaintState):
    return state


def route_request(state: ComplaintState):
    return state["request_type"]


# -------------------------
# Complaint Extraction Node
# -------------------------
def extract_node(state: ComplaintState):
    result = extract_complaint_data(state["input_text"])
    state["result"] = result
    return state


# -------------------------
# Chat Node
# -------------------------
def chat_node(state: ComplaintState):
    result = ask_complaint_question(state["input_text"])
    state["result"] = {"answer": result}
    return state


# -------------------------
# Update Node
# -------------------------
def update_node(state: ComplaintState):
    result = update_complaint_fields(
        state["current_data"], 
        state["input_text"]
    )
    state["result"] = result
    return state


# -------------------------
# Build Graph
# -------------------------
workflow = StateGraph(ComplaintState)

# Add Nodes
workflow.add_node("router", router_node)
workflow.add_node("extract", extract_node)
workflow.add_node("chat", chat_node)
workflow.add_node("update", update_node)

# Set Entry Point
workflow.set_entry_point("router")

# Add Conditional Edges from Router
workflow.add_conditional_edges(
    "router",
    route_request,
    {
        "extract": "extract",
        "chat": "chat",
        "update": "update",
    },
)

# Connect Worker Nodes to END
workflow.add_edge("extract", END)
workflow.add_edge("chat", END)
workflow.add_edge("update", END)

# Compile Graph
graph = workflow.compile()