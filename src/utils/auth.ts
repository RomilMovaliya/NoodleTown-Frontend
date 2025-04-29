export const passwordReset = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/resetPassword/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });

    const result = await response.json();

    return result;
}

