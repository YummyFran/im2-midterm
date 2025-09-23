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

export const searchAccount = async (email) => {
    try {
        const res = await fetch(`${API_URL}/search`, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        const data = await res.json()

        return [data, null]
    } catch (err) {
        console.log(err.message)
        return [null, err]
    }
}

export const resetPassword = async ({ uid, token, newPassword }) => {
    try {
        const res = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, token, newPassword })
        })
        const data = await res.json()

        return [data, null]
    } catch (err) {
        console.log(err.message)
        return [null, err]
    }
}

export const logOutCookie = async () => {
    try {
        const res = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        const data = await res.json()
        console.log(data)
    } catch (err) {
        console.log(err.message)
        return [null, err]
    }
}