import { auth } from "$lib/lucia"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({request}) => {
    try {
        await auth.validateRequest(request)
        const number = Math.floor(Math.random() * 999)
        return {
            body: JSON.stringify({
                number
            })
        }
    } catch {
        return {
            status: 401,
            body: JSON.stringify({
                error: "Unauthorized"
            })
        }
    }
}