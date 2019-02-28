// action types
const UPDATE_USER = 'UPDATE_USER'
const WIPE_USER = 'WIPE_USER'
const INIT_USER = 'INIT_USER'

/*{ access_token: 'hmZ1HCmYWylkfS5rNNGeiSniquwF4p350KBVFIKjAPQ',
  expires_in: 3600,
  token_type: 'bearer',
  scope: '',
  refresh_token: 'nSDA-nGHD6NlUmGM_TJxQS6Qljnii_magyu5E4DNfA8',
  user:
   { profile_image_urls:
      { px_16x16: 'https://s.pximg.net/common/images/no_profile_ss.png',
        px_50x50: 'https://s.pximg.net/common/images/no_profile_s.png',
        px_170x170: 'https://s.pximg.net/common/images/no_profile.png' },
     id: '10655509',
     name: 'nixizhiguang',
     account: 'nixizhiguang',
     mail_address: 'nixizhiguang@gmail.com',
     is_premium: false,
     x_restrict: 2,
     is_mail_authorized: true },
  device_token: '8b69ff3201b4365632cc447d81777cf9' }*/


// reducer
export default function (state, action) {
  if (!state) {
    state = {
    	user: {
      		isLogined: false,
      		accessToken: '',
      		refreshToken: '',
      		deviceToken: '',
      		expiresIn: 0,
      		tokenType: '',
      		scope: '',
      		loginTime: 0,
      		id: '',
      		name: '',
      		account: '',
      		mailAddress: '',
      		isPremium: false,
      		xRestrict: 0,
      		isMailAuthorized: false,
      		profileImageUrls: {
	      		px_16x16: 'https://s.pximg.net/common/images/no_profile_ss.png',
		        px_50x50: 'https://s.pximg.net/common/images/no_profile_s.png',
		        px_170x170: 'https://s.pximg.net/common/images/no_profile.png'
      		}
      	}
      }
  }
  switch (action.type) {
  	case: INIT_USER:
      return {
      	user: {
      		isLogined: action.user.isLogined,
      		loginAccount: action.user.loginAccount,
      		password: action.user.password,
      		accessToken: action.user.access_token,
      		refreshToken: action.user.refresh_token,
      		deviceToken: action.user.device_token,
      		expiresIn: action.user.expires_in,
      		tokenType: action.user.token_type,
      		scope: action.user.scope,
      		loginTime: action.user.loginTime,
      		id: action.user.id,
      		name: action.user.name,
      		account: action.user.account,
      		mailAddress: action.user.mail_address,
      		isPremium: action.user.is_premium,
      		xRestrict: action.user.x_restrict,
      		isMailAuthorized: action.user.is_mail_authorized,
      		profileImageUrls: action.user.profile_image_urls,
      	}
      }
    case UPDATE_USER:
      return {
      	user: {
      		isLogined: action.user.isLogined,
      		loginAccount: action.user.loginAccount,
      		password: action.user.password,
      		accessToken: action.user.access_token || state.user.accessToken,
      		refreshToken: action.user.refresh_token || state.user.refreshToken,
      		deviceToken: action.user.device_token || state.user.deviceToken,
      		expiresIn: action.user.expires_in || state.user.expiresIn,
      		tokenType: action.user.token_type || state.user.tokenType,
      		scope: action.user.scope || state.user.scope,
      		loginTime: action.user.loginTime || state.user.loginTime,
      		id: action.user.id || state.user.id,
      		name: action.user.name || state.user.name,
      		account: action.user.account || state.user.account,
      		mailAddress: action.user.mail_address || state.user.mailAddress,
      		isPremium: action.user.is_premium || state.user.isPremium,
      		xRestrict: action.user.x_restrict || state.user.xRestrict,
      		isMailAuthorized: action.user.is_mail_authorized || state.user.isMailAuthorized,
      		profileImageUrls: action.user.profile_image_urls || state.user.profileImageUrls,
      	}
 	}
    case WIPE_USER:
      return {
        user: {
      		isLogined: false,
      		accessToken: '',
      		refreshToken: '',
      		deviceToken: '',
      		expiresIn: 0,
      		tokenType: '',
      		scope: '',
      		loginTime: 0,
      		id: '',
      		name: '',
      		account: '',
      		mailAddress: '',
      		isPremium: false,
      		xRestrict: 0,
      		isMailAuthorized: false,
      		profileImageUrls: {
	      		px_16x16: 'https://s.pximg.net/common/images/no_profile_ss.png',
		        px_50x50: 'https://s.pximg.net/common/images/no_profile_s.png',
		        px_170x170: 'https://s.pximg.net/common/images/no_profile.png'
      		}
      	}
      }
    default:
      return state
  }
}

// action creators
export const initUser = (user) => {
  return { type: INIT_USER, user }
}

export const updateUser = (user) => {
  return { type: UPDATE_USER, user }
}

export const wipeUser = () => {
  return { type: WIPE_USER }
}