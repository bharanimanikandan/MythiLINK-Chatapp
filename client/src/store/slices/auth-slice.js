// Define the userinfo
export const createAuthSlice = (set)=>({
    userInfo: undefined,
    setUserInfo:(userInfo)=>set({userInfo}),
});