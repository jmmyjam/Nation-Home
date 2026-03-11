from pydantic import BaseModel

class Property(BaseModel):
    name: str
    address: str
    city: str
    avg_price: float