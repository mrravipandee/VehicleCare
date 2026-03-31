package `in`.thevehiclecare.data.api

import `in`.thevehiclecare.data.model.LoginOtpRequest
import `in`.thevehiclecare.data.model.LoginOtpResponse
import `in`.thevehiclecare.data.model.RegisterRequest
import `in`.thevehiclecare.data.model.RegisterResponse
import `in`.thevehiclecare.data.model.VerifyOtpRequest
import `in`.thevehiclecare.data.model.VerifyOtpResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {

    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>

    @POST("auth/login/send-otp")
    suspend fun sendOtp(@Body request: LoginOtpRequest): Response<LoginOtpResponse>

    @POST("auth/login/verify-otp")
    suspend fun verifyOtp(@Body request: VerifyOtpRequest): Response<VerifyOtpResponse>
}
