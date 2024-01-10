from pydantic import BaseModel, Field


class HairTypeDTO(BaseModel):
    user_id: str = Field(..., description="The unique identifier for the user")
    health: str = Field(..., description="The health condition of the hair", example="Chemically Treated")
    texture: str = Field(..., description="The texture of the hair", example="Curly")
    strand_thickness: str = Field(..., description="The thickness of the hair strands", example="Thick")
    scalp_condition: str = Field(..., description="The condition of the scalp", example="Oily")
    hair_concern: str = Field(..., description="The primary hair concern of the user", example="Volume")
