from pydantic import BaseModel

class Property(BaseModel):
    name: str
    image: str = ""
    price: float
