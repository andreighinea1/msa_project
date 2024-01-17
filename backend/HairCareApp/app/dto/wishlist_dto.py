from pydantic import BaseModel, Field


class WishlistProductDTO(BaseModel):
    WishlistID: str = Field(..., description="Unique identifier for the wishlist item")
    user_id: str = Field(..., description="The unique identifier for the user")
    product_id: str = Field(..., description="The unique identifier for the product")


class CheckWishlistProductDTO(BaseModel):
    is_wishlisted: bool = Field(..., description="Is the product wishlisted?")


class WishlistProductAddDTO(BaseModel):
    product_id: str = Field(..., description="The unique identifier for the product to be wishlisted")


class WishlistProductRemoveDTO(BaseModel):
    product_id: str = Field(..., description="The unique identifier for the product to be un-wishlisted")


class WishlistProductGetDTO(BaseModel):
    product_id: str = Field(..., description="The unique identifier for the product to check if wishlisted")
