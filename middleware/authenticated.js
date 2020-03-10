import axios from 'axios'

export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.empInfo) {

      var cname = "token"
      var token = ""

      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          token = c.substring(name.length, c.length);
        }
      }

      if(token == ""){
        return redirect('/employee/login')
      }

      var params = new FormData()
      params.append('token', token)

      axios.post(`${process.env.axiosBaseUrl}/employee/getSession`, params)
        .then((res) => {

          if(res.data == ""){
            document.cookie="token=";
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
  }