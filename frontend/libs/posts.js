'use server'

export async function updateTDStatus(id, status) {
    const data = {
        id: id,
        status: status
    }
    const res = await fetch('http://0.0.0.0:8000/update_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(data)
    })
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function addNewTD(date, details) {
    if(date == "" || details == "") {
        console.log("信息为空")
        return false
    }

    const data = {
        eta: date,
        details: details
    }
    console.log(typeof data.eta)
    const res = await fetch('http://0.0.0.0:8000/add_td', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(data)
    })
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}