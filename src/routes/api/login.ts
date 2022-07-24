import { auth } from "$lib/lucia"
import type { RequestHandler } from "@sveltejs/kit"
import type { Error } from "lucia-sveltekit"

export const POST: RequestHandler = async ({request}) => {
    const body = await request.json()
    const username = body.username
    const password = body.password
    if (!username || !password) {
        return {
            status: 400
        }
    }
    try {
        const authenticateUser = await auth.authenticateUser("username", username, password)
        return {
            status: 200,
            headers: {
                "set-cookie": authenticateUser.cookies
            }
        }
    } catch (e) {
        const error = e as Error
        if (error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" || error.message === "AUTH_INVALID_PASSWORD") {
            return {
                status: 400,
                body: JSON.stringify({
                    error: "Incorrect email or password"
                })
            }
        }
        return {
            status: 500,
            body: JSON.stringify({
                error: "Unknown error occurred"
            })
        }
    }
}