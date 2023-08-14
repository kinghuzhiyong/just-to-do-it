from sqlalchemy.orm import declarative_base, relationship, Session, Mapped, mapped_column
from database import engine
from sqlalchemy import String
from datetime import datetime
from sqlalchemy import func


Base = declarative_base()


class TDL(Base):
    __tablename__ = 'todolist'
    id: Mapped[int] = mapped_column(primary_key=True)
    # 笔记 - 获取当前时间
    createTime: Mapped[datetime] = mapped_column(default=func.now())
    eta: Mapped[datetime]
    text: Mapped[str] = mapped_column(String(256))
    status: Mapped[bool] = mapped_column(default=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


# 调用 create_all 创建所有模型
Base.metadata.create_all(engine)
