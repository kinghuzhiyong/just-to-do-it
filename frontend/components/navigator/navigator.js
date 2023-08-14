'use client'

import styles from './style.module.css'
import Link from 'next/link'

export default function Navigator() {
    function handleLiClick() {
        alert("click a li element")
    }
    return (
        <div className={styles.navContainer}>
            <ul className={styles.flexContainer}>
                <li className={styles.liContainer} onClick={handleLiClick}><span>Do Something1</span></li>
                <li className={styles.liContainer} onClick={handleLiClick}><span>Do Something2</span></li>
                <li className={styles.liContainer} onClick={handleLiClick}><span>Do Something3</span></li>
            </ul>
        </div>
    )
}