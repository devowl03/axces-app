const profileUrl = '/profile'
const editProfle = '/user/profile'
const balance = '/balance'
const recharge = '/recharge'
const LOCATION = (lat: number, long: number) =>  `lat=${lat}&lon=${long}&zoom=18&format=json`
const propertiesList = '/property/list'
const addToListUrl = '/property/addToWishlist'
const viewListUrl = '/property/viewWishlist'
const propertyUrl = (id: number) => `/property/${id}`
const addPropertyUrl = (id: number) => `/property/post/${id}`
const ownerDetailsUrl = (id: string) => `/property/contact-owner/${id}`
const getProfile = '/profile'
const verifyUserUrl = '/user/verify';

export {
    profileUrl,
    editProfle,
    balance,
    recharge,
    LOCATION,
    propertiesList,
    addToListUrl,
    viewListUrl,
    propertyUrl,
    addPropertyUrl,
    ownerDetailsUrl,
    getProfile,
    verifyUserUrl
}