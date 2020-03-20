export const state = () => ({
    empInfo: null,
    profile: null
})
  
export const mutations = {
    setEmpInfo (state, empInfo) {
        state.empInfo = empInfo
    },
    setProfile (state, profile) {
        state.profile = profile
    }
}