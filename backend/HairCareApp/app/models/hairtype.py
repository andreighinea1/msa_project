from pydantic import BaseModel

class HairType(BaseModel):
    name: str
    description: str
