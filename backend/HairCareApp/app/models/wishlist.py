from pydantic import BaseModel
from typing import List

class Wishlist(BaseModel):
    user_id: int
    product_ids: List[int]
