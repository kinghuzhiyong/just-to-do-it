import ToDoList from '@/components/todolist/todolist'
import Creator from '@/components/create-todo/creator'
import DoneList from '@/components/done-list/done-list'
import Loading from '@/app/loading'
import styles from './style.module.css'
import { Suspense } from 'react'


export default async function Page() {
    return (
        <div className={styles.pageContainer}>
            < Suspense fallback={<Loading />}>
                <ToDoList />
            </Suspense>
            <div className={styles.rightContainer}>
                <Creator />
                < Suspense fallback={<Loading />}>
                    <DoneList />
                </Suspense>
            </div>
        </div>
    )
}
