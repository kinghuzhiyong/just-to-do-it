'use client'

import styles from './style.module.css'
import { useState } from 'react';
import { addNewTD } from '../../libs/posts'
import { useRouter } from 'next/navigation'


export default function Creator() {

    const [date, setDate] = useState('')
    const [details, setDetails] = useState('')

    const router = useRouter()

    function handleDateChange(e) {
        setDate(e.target.value)
    }

    function handleTextareaChange(e) {
        setDetails(e.target.value)
    }

    return (
        <form className={styles.creatorContainer} action={async () => {
            let result = await addNewTD(date, details)
            console.log(result)
            if(!result){
                alert("信息不可为空")
            } else{
                router.refresh()
            }
        }}>
            <h3 className={styles.title}>Create New TD!</h3>
            <div className={styles.dateSelectorContainer}>
                <h4 className={styles.title}>1.ETA</h4>
                <input type="date" onChange={handleDateChange} value={date} />
            </div>
            <div>
                <h4 className={styles.title}>2.Details</h4>
                <textarea cols="25" rows="3" onChange={handleTextareaChange} value={details}></textarea>
            </div>
            <div>
                <button type='submit' className={styles.submitButton}>Submit</button>
            </div>
        </form>
    )
}