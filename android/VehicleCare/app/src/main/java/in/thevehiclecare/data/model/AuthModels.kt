package `in`.thevehiclecare.data.model

import com.google.gson.annotations.SerializedName

// Register Request
data class RegisterRequest(
    @SerializedName("phone_number")
    val phone_number: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("role")
    val role: String = "USER"
)

// Register Response
data class RegisterResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("message")
    val message: String,
    @SerializedName("data")
    val data: UserData? = null
)

// Login OTP Request
data class LoginOtpRequest(
    @SerializedName("phone_number")
    val phone_number: String
)

// Login OTP Response
data class LoginOtpResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("message")
    val message: String
)

// Verify OTP Request
data class VerifyOtpRequest(
    @SerializedName("phone_number")
    val phone_number: String,
    @SerializedName("code")
    val code: String
)

// Verify OTP Response
data class VerifyOtpResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("message")
    val message: String,
    @SerializedName("token")
    val token: String? = null,
    @SerializedName("data")
    val data: UserData? = null
)

// User Data
data class UserData(
    @SerializedName("id")
    val id: String,
    @SerializedName("phone_number")
    val phone_number: String,
    @SerializedName("name")
    val name: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("role")
    val role: String
)

// Error Response
data class ErrorResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("message")
    val message: String
)
