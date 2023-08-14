'use client' // Error components must be Client Components

import { useEffect } from 'react'
import ErrorPage from '@/components/error/error'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    // 返回一个复杂的错误提示页面的组件
    return (
        <div>
            <ErrorPage
                error={error}
                reset={reset}
            />
        </div>
    )
}