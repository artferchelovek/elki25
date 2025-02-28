from sqlalchemy.orm import Mapped, mapped_column
from datetime import date

from database import *


class UserModel(Model):
    __tablename__ = "Users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    name: Mapped[str]
    surname: Mapped[str]
    hashed_password: Mapped[str]
    email: Mapped[str]
    birthday: Mapped[date]
    phone_number: Mapped[str]
