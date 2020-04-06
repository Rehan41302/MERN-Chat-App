import axios from 'axios'

export const getAttendce = () => dispatch => {
  axios.get('/api/admin/attendence').then(res=>{
    console.log('Attendence===>',res.data)
  }).catch(err=>{
 console.log(err.message)
  })
}