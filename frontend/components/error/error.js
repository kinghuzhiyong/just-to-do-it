// 声明一个错误处理页面组件
import React from 'react'
import styles from './style.module.css'
import { useRouter } from 'next/navigation'


export default function ErrorPage({ error, reset }) {

    const router = useRouter()
    function refresh(){
        // 重定向到首页
        router.push('/')
        reset()
    }

    return (
        <div className={styles.container}>
            <h1>Error</h1>
            <h2>Fail message</h2>
            <p>{error.message}</p>
            <button onClick={refresh}>Try again</button>
        </div>
    )
}