export default {
    success: (data: any) => ({ code: 200, status: 'success', data }),
    error: (message: string) => ({ code: 500, status: 'error', message })
}