from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select, update
from dependencies import get_db
from models import TDL
from schemas import Data, UpdateData
from typing import Union
from datetime import datetime
from libs import process_datetime
import arrow
import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from libs import send_email

from database import SessionLocal


app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/get_list')
async def get_list(db: Session = Depends(get_db)):

    # await asyncio.sleep(5)

    stmt = select(TDL).where(TDL.status == False).order_by(TDL.eta)
    result = db.execute(stmt).scalars().all()
    to_do_list = list(map(lambda x: x.to_dict(), result))
    result_list = list(map(process_datetime, to_do_list))
    return {'data': result_list}


@app.get('/get_done_list')
async def get_done_list(db: Session = Depends(get_db)):

    # await asyncio.sleep(8)

    stmt = select(TDL).where(TDL.status == True).order_by(TDL.eta)
    result = db.execute(stmt).scalars().all()
    to_do_list = list(map(lambda x: x.to_dict(), result))
    result_list = list(map(process_datetime, to_do_list))
    return {'data': result_list}


@app.post('/update_info')
async def update_info(data: UpdateData, db: Session = Depends(get_db)):
    print("修改ID:{}的状态".format(data.id))
    if (data.status == "Done"):
        stmt = update(TDL).where(TDL.id == data.id).values(
            status=True).execution_options(synchronize_session="fetch")
    else:
        stmt = update(TDL).where(TDL.id == data.id).values(
            status=False).execution_options(synchronize_session="fetch")

    db.execute(stmt)
    db.commit()
    return {"message": "success"}


@app.post('/add_td')
async def add_td(data: Data, db: Session = Depends(get_db)):
    print("新增一条待办")
    date = arrow.get(data.eta)
    details = data.details
    todo1 = TDL(eta=date, text=details)
    db.add(todo1)
    db.commit()
    print("新增完成")
    return {"message": "success"}


# 创建定时任务
scheduler = AsyncIOScheduler()


@scheduler.scheduled_job('cron', hour=10, minute=0, id='check_expire_todo')
async def check_expire_todo():
    db = SessionLocal()
    print("开始执行定时函数")
    stmt1 = select(TDL).where(TDL.status == False).order_by(TDL.eta)
    undone_data = db.execute(stmt1).scalars().all()

    expire_list = []
    ontime_list = []
    for row in undone_data:
        # 比较时间大小
        eta_time = arrow.get(row.eta)
        if eta_time <= arrow.now():
            print(row.id, "过期了")
            expire_list.append(row.to_dict())
        else:
            ontime_list.append(row.to_dict())

    # 发送邮件
    send_email(expire_list, ontime_list)
    db.close()


@app.on_event("startup")
async def startup():
    scheduler.start()


@app.on_event("shutdown")
async def shutdown():
    scheduler.shutdown()
