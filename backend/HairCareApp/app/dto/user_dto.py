from pydantic import BaseModel, EmailStr, Field


class UserCreateDTO(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50, description="The user's first name")
    last_name: str = Field(..., min_length=1, max_length=50, description="The user's last name")
    email: EmailStr = Field(..., description="The user's email address")
    password: str = Field(..., min_length=7, max_length=50, description="A password for the user account")
    confirm_password: str = Field(..., min_length=7, max_length=50, description="The same password as above")

    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "johndoe@example.com",
                "password": "a_secure_password_123",
                "confirm_password": "a_secure_password_123"
            }
        }


class UserLoginDTO(BaseModel):
    email: EmailStr = Field(..., description="The user's email address used to register")
    password: str = Field(..., description="The user's password for login")


class UserResponseDTO(BaseModel):
    user_id: str = Field(..., description="The unique identifier for the user")
    first_name: str = Field(..., description="The user's first name")
    last_name: str = Field(..., description="The user's last name")
    email: EmailStr = Field(..., description="The user's email address")


class UserLoginResponseDTO(BaseModel):
    user_id: str = Field(..., description="The unique identifier for the user")
    first_name: str = Field(..., description="The user's first name")
    last_name: str = Field(..., description="The user's last name")
    email: EmailStr = Field(..., description="The user's email address")
    password: str = Field(..., description="The user's hashed password from the db")
