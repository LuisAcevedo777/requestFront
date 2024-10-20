import { configureStore } from '@reduxjs/toolkit'
import  isLoadingSlice from './slices/isLoading.slice'
import  requestSlice  from './slices/request.slice'
import employeeSlice from './slices/employee.slice'


export default configureStore({
    reducer: {
            isLoading: isLoadingSlice,
            request: requestSlice,
            employee: employeeSlice
            
    }
})
