import styles from './style.module.css'
import { getToDoList } from '@/libs/fetchs'
import NormalButton from '@/components/normal-button/normal-button'
import print from "@/libs/logger"

export default async function ToDoList() {
    print("渲染待办列表")
    // 获取 ToDolist
    const result = await getToDoList()
    // console.log(result)
    const empty = (
        <h1 className={styles.empty}>Empty~</h1>
    )
    return (
        <div className={styles.toDoListContainer}>
            {result.data.length > 0 ? result.data.map(item => (<ToDoBar info={item} />)) : empty}
        </div>
    )
}

async function ToDoBar({ info }) {

    // 针对待办是否过期，应用不同的样式
    let containerStyle
    const expireStyle = styles.expireBarContainer
    const normalStyle = styles.normalBarContainer
    // 获取当前时间
    const now = new Date()
    const date = new Date(info.eta)
    // 判断是否过期
    if (date.getTime() > now.getTime()) {
        containerStyle = normalStyle
    } else {
        containerStyle = expireStyle
    }

    // 计算 date 和 now 相差几个小时
    let hourDiff = Math.floor((date.getTime() - now.getTime()) / (3600 * 1000))
    let dayLeft = Math.floor(hourDiff / 24)
    let hours = hourDiff - (dayLeft * 24)

    return (
        <div className={containerStyle}>
            <div className={styles.dateContainer}>
                <div className={styles.etaText}>
                    <span>ETA: </span>
                    <span>{info.eta}</span>
                </div>
                <div>
                    <span>Time Left: </span>
                    <span>{dayLeft} Day {hours} Hour</span>
                </div>
                <div>
                    <span>Create Date: </span>
                    <span>{info.createTime}</span>
                </div>
                {/* <div>
                    <span>Status: </span>
                    <span>{info.status ? "Done" : "Not yet"}</span>
                </div> */}
            </div>
            {/* 分割线 */}
            <div className={styles.divider}></div>
            <div className={styles.textNCheckboxContainer}>
                <div className={styles.centerTextContainer}>
                    <p className={styles.toDoDetail}>{info.text}</p>
                </div>
                <NormalButton id={info.id} text="Done" />
                {/* <NormalButton id={info.id} text="X" /> */}
            </div>
        </div>
    )
}
