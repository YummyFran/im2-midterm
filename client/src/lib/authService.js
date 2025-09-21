const API_URL = 'http://localhost:8000/api/auth'

export const signup = async(credentials) => {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
        const data = await res.json()
        
        return [data, null]
    } catch (err) {
        console.log(err.message)
        return [null, err]
    }
}

export const login = async (credentials) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
        const data = await res.json()
        
        return [data, null]
    } catch (err) {
        console.log(err.message)
        return [null, err]
    }
}