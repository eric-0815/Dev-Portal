export const createErrorMsg = (msg: string) => {
    return ({ errors: [{ msg }] })
}