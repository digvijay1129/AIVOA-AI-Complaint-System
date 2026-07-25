import json
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

print("Groq Key:", os.getenv("GROQ_API_KEY"))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Stores the latest extracted complaint
latest_complaint = {}


def extract_complaint_data(text: str):
    prompt = f"""
You are an AI assistant for a pharmaceutical complaint management system.

Extract the complaint information from the text below.

Return ONLY valid JSON.

IMPORTANT RULES:

1. manufacturing_date and expiry_date MUST be in YYYY-MM-DD format.
Example:
2027-01-10

2. quantity must contain ONLY the number.
Example:
20

NOT:
20 tablets

3. Do not include units like tablets, bottles, capsules inside quantity.

JSON format:

{{
    "complaint_source":"",
    "customer_name":"",
    "product_name":"",
    "product_strength":"",
    "batch_number":"",
    "manufacturing_date":"",
    "expiry_date":"",
    "quantity":"",
    "description":""
}}

Complaint:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0,
    )

    result = response.choices[0].message.content

    print("Groq Response:")
    print(result)

    # Remove markdown code fences if present
    result = result.replace("```json", "").replace("```", "").strip()

    global latest_complaint
    latest_complaint = json.loads(result)

    # Automatically generate QA assessment fields and merge into complaint data
    assessment = generate_ai_assessment()
    latest_complaint.update(assessment)

    return latest_complaint


def generate_ai_assessment():
    prompt = f"""
You are a Pharmaceutical Quality Assurance (QA) expert.

Based ONLY on the complaint below, generate a JSON response.

Complaint:

{json.dumps(latest_complaint, indent=2)}

Return ONLY valid JSON.

Format:

{{
    "initial_severity":"",
    "suggested_action":"",
    "written_assessment":""
}}

Rules:

1. Severity must be one of:
- Low
- Medium
- High
- Critical

2. Suggested Action should be concise and practical.

3. Written Assessment should be a professional QA investigation summary.

4. Do not invent customer information.

5. Return ONLY JSON.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    result = response.choices[0].message.content
    result = result.replace("```json", "").replace("```", "").strip()

    return json.loads(result)


def ask_complaint_question(question: str):
    prompt = f"""
You are an expert Pharmaceutical Quality Assurance (QA) AI Assistant.

You are helping a Quality Management System (QMS).

Below is the extracted complaint.

Complaint Data:

{json.dumps(latest_complaint, indent=2)}

Your responsibilities:

1. Answer questions using the complaint data.

2. If asked for a summary, write a concise professional summary.

3. If asked about severity, estimate: Low, Medium, High, or Critical, and explain why.

4. If asked about missing information, identify fields that are empty.

5. If asked for next action, recommend what the QA team should do.

6. If asked for assessment, write a professional investigation assessment.

7. Never invent complaint details.

8. If the answer cannot be determined from the complaint, reply exactly:
"I couldn't find that information in the uploaded complaint."

User Question:

{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content


def update_complaint_fields(current_data: dict, message: str):
    prompt = f"""
You are an AI assistant for a Pharmaceutical Complaint Management System.

The current complaint data is:
{json.dumps(current_data, indent=2)}

The user has provided an update:

"{message}"

Your task:

1. Identify ONLY the fields that should be updated.
2. Do NOT return fields that are unchanged.
3. If the user mentions quantity like "48 capsules", return only the numeric value:
   "48"
4. Convert manufacturing_date and expiry_date to YYYY-MM-DD format whenever possible.
5. If no valid field updates are found, return an empty JSON object.

Allowed fields:

- complaint_source
- customer_name
- customer_email
- product_name
- product_strength
- batch_number
- manufacturing_date
- expiry_date
- quantity
- description

Return ONLY valid JSON.

Example:
{{
    "batch_number": "BMX240602",
    "quantity": "48"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0,
    )

    result = response.choices[0].message.content

    print("Groq Raw Response:")
    print(result)

    result = result.replace("```json", "").replace("```", "").strip()

    updated = json.loads(result)

    print("Parsed Response:")
    print(updated)

    return updated