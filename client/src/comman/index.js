const backendDomain = 'http://localhost:8000'
const SummaryApi = {
    signup:`${backendDomain}/api/signup`,
    signin:`${backendDomain}/api/signin`,
    user_details:`${backendDomain}/api/user-details`,
    user_logout:`${backendDomain}/api/user-logout`,
    all_users:`${backendDomain}/api/all-users`,
    update_user:`${backendDomain}/api/update-user`,
    delete_user:`${backendDomain}/api/delete-user/:id`,


}

export default SummaryApi;