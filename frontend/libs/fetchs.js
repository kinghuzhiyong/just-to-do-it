export async function getToDoList() {
    const res = await fetch('http://0.0.0.0:8000/get_list', { cache: 'no-store' })
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function getDoneList() {
    const res = await fetch('http://0.0.0.0:8000/get_done_list', { cache: 'no-store' })
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
