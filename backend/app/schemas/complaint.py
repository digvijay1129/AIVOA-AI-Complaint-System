from pydantic import BaseModel


class ComplaintCreate(BaseModel):
    complaint_source: str
    customer_name: str
    product_name: str
    product_strength: str
    batch_number: str
    manufacturing_date: str
    expiry_date: str
    quantity: str
    description: str