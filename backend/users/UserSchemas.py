from pydantic import BaseModel, ConfigDict, Field
from datetime import date

class SUserRegister(BaseModel):
    username: str
    hashed_password: str
    email: str
    birthday: date
    phone_number: str = Field(pattern=r"(\+7|8)[0-9]{10}")

class SUser(SUserRegister):
    id: int
    model_config = ConfigDict(from_attributes=True)
