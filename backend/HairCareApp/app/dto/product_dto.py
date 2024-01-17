from typing import List, Dict

from pydantic import BaseModel, Field


class ProductDTO(BaseModel):
    product_id: str = Field(..., description="Unique identifier for the product")
    name: str = Field(..., description="Name of the product")
    type: str = Field(..., description="Type of the product e.g., shampoo, conditioner")
    price: str = Field(..., description="Price of the product")
    description: str = Field(..., description="Description of the product")
    url: str = Field(..., description="URL of the product")
    suitable_hair_types: Dict[str, str] = Field(
        ...,
        description="Dictionary of hair type categories with suitable options"
    )

    class Config:
        schema_extra = {
            "example": {
                "product_id": "prod123",
                "name": "Natural Shampoo",
                "type": "shampoo",
                "price": "$20",
                "description": "Organic shampoo for dry hair",
                "url": "https://something.com",
                "suitable_hair_types": {
                    "health": "Healthy",
                    "texture": "Curly",
                    "strand_thickness": "Medium",
                    "scalp_condition": "Dry",
                    "hair_concern": "Moisture"
                }
            }
        }


class ProductRecommendationRequestDTO(BaseModel):
    product_type: str = Field(..., description="The type of the product for which recommendations are sought")


class ProductTypeRequestDTO(BaseModel):
    product_type: str = Field(..., description="The type of the product")
