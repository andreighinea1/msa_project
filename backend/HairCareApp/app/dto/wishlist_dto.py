from pydantic import BaseModel, Field


class WishlistProductDTO(BaseModel):
    wishlist_id: str = Field(..., description="Unique identifier for the wishlist item")
    user_id: str = Field(..., description="The unique identifier for the user")
    product_id: str = Field(..., description="The unique identifier for the product")


class WishlistProductAddDTO(BaseModel):
    product_id: str = Field(..., description="The unique identifier for the product to be wishlisted")
