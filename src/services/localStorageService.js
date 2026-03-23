const K = {
  uid:'uid', name:'name', mobile:'mobile', email:'email', age:'age',
  gender:'gender', isLoggedIn:'isLoggedIn', isProfileComplete:'isProfileComplete',
}

export function saveUserProfile(user) {
  try {
    localStorage.setItem(K.uid,               user.uid    || '')
    localStorage.setItem(K.name,              user.name   || '')
    localStorage.setItem(K.mobile,            user.mobile || '')
    localStorage.setItem(K.email,             user.email  || '')
    localStorage.setItem(K.age,               user.age    || '')
    localStorage.setItem(K.gender,            user.gender || 'Male')
    localStorage.setItem(K.isLoggedIn,        String(user.isLoggedIn        ?? false))
    localStorage.setItem(K.isProfileComplete, String(user.isProfileComplete ?? false))
  } catch (e) { console.error(e) }
}

export function loadUserProfile() {
  try {
    if (localStorage.getItem(K.isLoggedIn) !== 'true')
      return { isLoggedIn: false, userData: null }
    return {
      isLoggedIn: true,
      userData: {
        uid:              localStorage.getItem(K.uid)    || '',
        name:             localStorage.getItem(K.name)   || '',
        mobile:           localStorage.getItem(K.mobile) || '',
        email:            localStorage.getItem(K.email)  || '',
        age:              localStorage.getItem(K.age)    || '',
        gender:           localStorage.getItem(K.gender) || 'Male',
        isLoggedIn:       true,
        isProfileComplete: localStorage.getItem(K.isProfileComplete) === 'true',
      },
    }
  } catch { return { isLoggedIn: false, userData: null } }
}

export function clearAll() { try { localStorage.clear() } catch (_) {} }

export function isProfileComplete() {
  return localStorage.getItem(K.isProfileComplete) === 'true'
}
