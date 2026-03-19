const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isEmailValid = (email: string | undefined) => {
  if (!email)
    return false
  return emailRegexp.test(email)
}
