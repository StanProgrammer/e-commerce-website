const backendDomain = 'http://localhost:8000'
const SummaryApi = {
    signup:`${backendDomain}/api/signup`,
    signin:`${backendDomain}/api/signin`,
    user_details:`${backendDomain}/api/user-details`,
    user_logout:`${backendDomain}/api/user-logout`,
    all_users:`${backendDomain}/api/all-users`,
    update_user:`${backendDomain}/api/update-user`,
    delete_user:`${backendDomain}/api/delete-user`,
    upload_product:`${backendDomain}/api/upload-product`,
    get_product:`${backendDomain}/api/get-product`,
    update_product:`${backendDomain}/api/update-product`,
    delete_product:`${backendDomain}/api/delete-product`,
    category_product:`${backendDomain}/api/category-product`,
    category_wise_product:`${backendDomain}/api/category-wise`,
}

export default SummaryApi;