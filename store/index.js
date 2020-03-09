export const state = () => ({
    empInfo: null
})
  
export const mutations = {
    setEmpInfo (state, empInfo) {
        state.empInfo = empInfo
    }
}