import styles from './style.module.css'
import { getDoneList } from '@/libs/fetchs'

export default async function DoneList() {
    // 获取 ToDolist
    const result = await getDoneList()
    const empty = (
        <h1 className={styles.empty}>Empty~</h1>
    )
    return (
        <div className={styles.doneListContainer}>
            {result.data.length > 0 ? result.data.map(item => (<DoneBar info={item} />)) : empty}
        </div>
    )
}

async function DoneBar({ info }) {

    console.log(info)

    return (
        <div className={styles.doneBarContainer}>
            <div>
                <div>
                    <span>ETA: </span>
                    <span>{info.eta}</span>
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
            <p className={styles.textContainer}>{info.text}</p>
        </div>
    )
}
