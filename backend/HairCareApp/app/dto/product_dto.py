from typing import List, Dict

from pydantic import BaseModel, Field


class HairTypeDTO(BaseModel):
    health: str = Field(..., description="The health condition of the hair", example="Chemically Treated")
    texture: str = Field(..., description="The texture of the hair", example="Curly")
    strand_thickness: str = Field(..., description="The thickness of the hair strands", example="Thick")
    scalp_condition: str = Field(..., description="The condition of the scalp", example="Oily")
    hair_concern: str = Field(..., description="The primary hair concern of the user", example="Volume")


class ProductDTO(BaseModel):
    product_id: str = Field(..., description="Unique identifier for the product")
    name: str = Field(..., description="Name of the product")
    type: str = Field(..., description="Type of the product e.g., shampoo, conditioner")
    description: str = Field(..., description="Description of the product")
    suitable_hair_types: Dict[str, List[str]] = Field(
        ...,
        description="Dictionary of hair type categories with suitable options"
    )

    class Config:
        schema_extra = {
            "example": {
                "product_id": "prod123",
                "name": "Natural Shampoo",
                "type": "shampoo",
                "description": "Organic shampoo for dry hair",
                "suitable_hair_types": {
                    "health": ["Healthy"],
                    "texture": ["Curly", "Coily"],
                    "strand_thickness": ["Medium", "Thick"],
                    "scalp_condition": ["Dry"],
                    "hair_concern": ["Moisture", "Curl Definition"]
                }
            }
        }
