package `in`.thevehiclecare.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import `in`.thevehiclecare.ui.components.OTPTextField
import `in`.thevehiclecare.ui.components.PrimaryButton
import `in`.thevehiclecare.ui.components.ErrorMessage
import `in`.thevehiclecare.ui.components.SuccessMessage
import `in`.thevehiclecare.ui.theme.Primary
import `in`.thevehiclecare.ui.theme.TextColor
import `in`.thevehiclecare.ui.theme.DarkBg
import `in`.thevehiclecare.viewmodel.AuthViewModel

@Composable
fun VerifyOtpScreen(
    authViewModel: AuthViewModel,
    phoneNumber: String,
    onNavigateToHome: () -> Unit,
    onNavigateBack: () -> Unit,
    onResendOtp: () -> Unit
) {
    val isDarkTheme = isSystemInDarkTheme()
    val backgroundColor = if (isDarkTheme) DarkBg else Color.White
    val scrollState = rememberScrollState()

    var otp by remember { mutableStateOf("") }
    var resendTimer by remember { mutableStateOf(0) }

    val uiState by authViewModel.verifyOtpState.collectAsState()

    // Auto-verify when OTP is 6 digits
    if (otp.length == 6 && !uiState.isLoading) {
        authViewModel.verifyOtp(phoneNumber, otp)
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundColor)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header
            Box(
                modifier = Modifier
                    .padding(top = 16.dp)
                    .align(Alignment.Start)
                    .fillMaxWidth()
            ) {
                IconButton(onClick = onNavigateBack) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = TextColor
                    )
                }
            }

            Spacer(modifier = Modifier.height(40.dp))

            // Title
            Text(
                text = "Verify OTP",
                fontSize = 32.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = TextColor
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Subtitle with phone number
            Text(
                text = "We've sent a 6-digit code to\n$phoneNumber",
                fontSize = 14.sp,
                color = androidx.compose.ui.graphics.Color.Gray,
                modifier = Modifier.padding(top = 8.dp, bottom = 32.dp)
            )

            // Error Message
            if (uiState.error.isNotEmpty()) {
                ErrorMessage(uiState.error)
                Spacer(modifier = Modifier.height(16.dp))
            }

            // Success Message
            if (uiState.success) {
                SuccessMessage("OTP verified successfully!")
                Spacer(modifier = Modifier.height(16.dp))
            }

            Spacer(modifier = Modifier.height(20.dp))

            // OTP Input
            Text(
                text = "Enter OTP Code",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = TextColor,
                modifier = Modifier
                    .align(Alignment.Start)
                    .padding(bottom = 8.dp)
            )
            OTPTextField(
                value = otp,
                onValueChange = { otp = it }
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Verify Button
            PrimaryButton(
                text = "Verify OTP",
                onClick = {
                    authViewModel.verifyOtp(phoneNumber, otp)
                },
                isLoading = uiState.isLoading,
                enabled = otp.length == 6 && !uiState.isLoading
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Resend OTP
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 16.dp),
                contentAlignment = Alignment.Center
            ) {
                if (resendTimer > 0) {
                    Text(
                        text = "Resend OTP in ${resendTimer}s",
                        fontSize = 14.sp,
                        color = androidx.compose.ui.graphics.Color.Gray
                    )
                } else {
                    androidx.compose.foundation.layout.Row {
                        Text(
                            text = "Didn't receive code? ",
                            fontSize = 14.sp,
                            color = TextColor
                        )
                        TextButton(onClick = onResendOtp) {
                            Text(
                                text = "Resend",
                                fontSize = 14.sp,
                                color = Primary,
                                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(40.dp))

            // Info Text
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        color = Primary.copy(alpha = 0.1f),
                        shape = androidx.compose.foundation.shape.RoundedCornerShape(8.dp)
                    )
                    .padding(12.dp)
            ) {
                Text(
                    text = "The OTP will expire in 10 minutes. Make sure to enter it within this time.",
                    color = Primary,
                    fontSize = 12.sp
                )
            }

            Spacer(modifier = Modifier.height(40.dp))
        }
    }
}
