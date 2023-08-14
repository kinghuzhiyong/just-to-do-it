'use client'

import styles from './style.module.css'
import { useState, useTransition } from 'react'
import { updateTDStatus } from '../../libs/posts'
import { useRouter } from 'next/navigation'


export default function NormalButton({ id, text }) {

    let [isPending, startTransition] = useTransition()
    // let [disableFlag, setDisableFlag] = useState(false)
    const router = useRouter()

    return (
        <button className={text == "Done" ? styles.greenButton : styles.redButton} onClick={(e) => {
            startTransition(() => {
                updateTDStatus(id, text)
                router.refresh()
            })
        }}>
            {text}
        </button>
    )
}