from pydantic import BaseModel


class Data(BaseModel):
    eta: str
    details: str


class UpdateData(BaseModel):
    id: int
    status: str