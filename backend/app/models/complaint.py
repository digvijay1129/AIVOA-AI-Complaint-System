from sqlalchemy import Column, Date, DateTime, Integer, String, Text
from datetime import datetime

from app.database.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    complaint_source = Column(String(100))
    customer_name = Column(String(255))
    customer_email = Column(String(255))

    product_name = Column(String(255))
    product_strength = Column(String(100))
    batch_number = Column(String(100))

    manufacturing_date = Column(Date)
    expiry_date = Column(Date)

    affected_quantity = Column(Integer)

    complaint_category = Column(String(150))

    complaint_description = Column(Text)

    initial_severity = Column(String(50))
    suggested_action = Column(Text)
    written_assessment = Column(Text)

    status = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)