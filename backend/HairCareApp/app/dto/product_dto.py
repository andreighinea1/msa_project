from typing import List, Dict

from pydantic import BaseModel, Field


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
