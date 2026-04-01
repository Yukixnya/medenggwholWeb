import { Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen       from './screens/SplashScreen'
import LoginScreen        from './screens/LoginScreen'
import ProfileScreen      from './screens/ProfileScreen'
import CategoryScreen     from './screens/CategoryScreen'
import SubCategoryScreen  from './screens/SubCategoryScreen'
import PatientInputScreen from './screens/PatientInputScreen'
import SolutionScreen     from './screens/SolutionScreen'
import AppointmentScreen  from './screens/AppointmentScreen'

export default function App() {
  return (
      <div className="app-shell">
        <Routes>
          <Route path="/"               element={<SplashScreen />}       />
          <Route path="/login"          element={<LoginScreen />}        />
          <Route path="/profile"        element={<ProfileScreen />}      />
          <Route path="/categories"     element={<CategoryScreen />}     />
          <Route path="/sub-categories" element={<SubCategoryScreen />}  />
          <Route path="/patient-input"  element={<PatientInputScreen />} />
          <Route path="/solution"       element={<SolutionScreen />}     />
          <Route path="/appointment"    element={<AppointmentScreen />}  />
          {/* Payment route preserved for future but not linked in UI */}
          {/* <Route path="/payment" element={<PaymentScreen />} /> */}
          <Route path="*"               element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  )
}