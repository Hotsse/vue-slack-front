export default function ({ app, store, redirect }) {

  // If the user is not authenticated
  /*
  if (!store.state.empInfo) {

    const accessToken = app.$cookies.get('accessToken')

    if(accessToken == ""){
      return redirect('/employee/login')
    }

    app.$axios.post('/employee/isValidToken', null, {      
      headers: {Authorization: accessToken}
    })
      .then((res) => {

        if(res.data == "") {
          app.$cookies.set("accessToken", null, {
            path: '/',
            domain: '.hotsse.me',
            maxAge: 0
          });
          return redirect('/employee/login')
        }

        var empInfo = {
          empNo: res.data.empNo,
          empNm: res.data.empNm
        }

        store.commit('setEmpInfo', empInfo)
      })
      .catch((err) => {
        console.log(err)
        return redirect('/employee/login')
      })

  }
  */

  const accessToken = app.$cookies.get('accessToken')

  if(accessToken == ""){
    return redirect('/employee/oauth')
  }

  app.$axios.post('/employee/isValidOAuthToken', null, {      
    headers: {Authorization: accessToken}
  })
    .then((res) => {

      if(res.data == "") {
        app.$cookies.set("accessToken", null, {
          path: '/',
          domain: '.weboffice.co.kr',
          maxAge: 0
        });
        return redirect('/employee/oauth')
      }

      var profile = {
        CMPName: res.data.cmpname,
        EMPNO: res.data.empno,
        EMPName: res.data.empname
      }

      store.commit('setProfile', profile)
    })
    .catch((err) => {
      console.log(err)
      return redirect('/employee/oauth')
    })
}