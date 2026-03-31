package `in`.thevehiclecare.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import `in`.thevehiclecare.data.api.RetrofitClient
import `in`.thevehiclecare.data.model.LoginOtpRequest
import `in`.thevehiclecare.data.model.RegisterRequest
import `in`.thevehiclecare.data.model.VerifyOtpRequest
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class RegisterUiState(
    val isLoading: Boolean = false,
    val error: String = "",
    val success: Boolean = false,
    val userName: String = ""
)

data class LoginOtpUiState(
    val isLoading: Boolean = false,
    val error: String = "",
    val success: Boolean = false
)

data class VerifyOtpUiState(
    val isLoading: Boolean = false,
    val error: String = "",
    val success: Boolean = false,
    val token: String = ""
)

class AuthViewModel : ViewModel() {
    private val authApi = RetrofitClient.authApi

    private val _registerState = MutableStateFlow(RegisterUiState())
    val registerState: StateFlow<RegisterUiState> = _registerState

    private val _loginOtpState = MutableStateFlow(LoginOtpUiState())
    val loginOtpState: StateFlow<LoginOtpUiState> = _loginOtpState

    private val _verifyOtpState = MutableStateFlow(VerifyOtpUiState())
    val verifyOtpState: StateFlow<VerifyOtpUiState> = _verifyOtpState

    fun register(phoneNumber: String, name: String, email: String) {
        viewModelScope.launch {
            try {
                _registerState.value = _registerState.value.copy(isLoading = true, error = "")
                
                val request = RegisterRequest(
                    phone_number = phoneNumber,
                    name = name,
                    email = email,
                    role = "USER"
                )
                
                val response = authApi.register(request)
                
                if (response.isSuccessful && response.body()?.success == true) {
                    _registerState.value = _registerState.value.copy(
                        isLoading = false,
                        success = true,
                        userName = name
                    )
                } else {
                    _registerState.value = _registerState.value.copy(
                        isLoading = false,
                        error = response.body()?.message ?: "Registration failed. Please try again."
                    )
                }
            } catch (e: Exception) {
                _registerState.value = _registerState.value.copy(
                    isLoading = false,
                    error = e.message ?: "An error occurred. Please try again."
                )
            }
        }
    }

    fun sendLoginOtp(phoneNumber: String) {
        viewModelScope.launch {
            try {
                _loginOtpState.value = _loginOtpState.value.copy(isLoading = true, error = "")
                
                val request = LoginOtpRequest(phone_number = phoneNumber)
                val response = authApi.sendOtp(request)
                
                if (response.isSuccessful && response.body()?.success == true) {
                    _loginOtpState.value = _loginOtpState.value.copy(
                        isLoading = false,
                        success = true
                    )
                } else {
                    _loginOtpState.value = _loginOtpState.value.copy(
                        isLoading = false,
                        error = response.body()?.message ?: "Failed to send OTP. Please try again."
                    )
                }
            } catch (e: Exception) {
                _loginOtpState.value = _loginOtpState.value.copy(
                    isLoading = false,
                    error = e.message ?: "An error occurred. Please try again."
                )
            }
        }
    }

    fun verifyOtp(phoneNumber: String, code: String) {
        viewModelScope.launch {
            try {
                _verifyOtpState.value = _verifyOtpState.value.copy(isLoading = true, error = "")
                
                val request = VerifyOtpRequest(phone_number = phoneNumber, code = code)
                val response = authApi.verifyOtp(request)
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val token = response.body()?.token ?: ""
                    _verifyOtpState.value = _verifyOtpState.value.copy(
                        isLoading = false,
                        success = true,
                        token = token
                    )
                    // Save token to secure storage here if needed
                } else {
                    _verifyOtpState.value = _verifyOtpState.value.copy(
                        isLoading = false,
                        error = response.body()?.message ?: "Invalid OTP. Please try again."
                    )
                }
            } catch (e: Exception) {
                _verifyOtpState.value = _verifyOtpState.value.copy(
                    isLoading = false,
                    error = e.message ?: "An error occurred. Please try again."
                )
            }
        }
    }

    fun resetLoginOtpState() {
        _loginOtpState.value = LoginOtpUiState()
    }

    fun resetVerifyOtpState() {
        _verifyOtpState.value = VerifyOtpUiState()
    }

    fun resetRegisterState() {
        _registerState.value = RegisterUiState()
    }
}
