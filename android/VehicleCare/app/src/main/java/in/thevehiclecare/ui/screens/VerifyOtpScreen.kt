package `in`.thevehiclecare.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material.icons.automirrored.filled.ArrowBack
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import `in`.thevehiclecare.ui.components.OTPTextField
import `in`.thevehiclecare.ui.components.PrimaryButton
import `in`.thevehiclecare.ui.components.ErrorMessage
import `in`.thevehiclecare.ui.theme.Primary
import `in`.thevehiclecare.ui.theme.TextColor
import `in`.thevehiclecare.ui.theme.DarkBg
import `in`.thevehiclecare.ui.theme.DarkSurface
import `in`.thevehiclecare.ui.theme.TextDark
import `in`.thevehiclecare.viewmodel.AuthViewModel
import androidx.compose.runtime.LaunchedEffect
import kotlinx.coroutines.delay

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
    val context = LocalContext.current

    var otp by remember { mutableStateOf("") }
    var resendTimer by remember { mutableStateOf(0) }

    val uiState by authViewModel.verifyOtpState.collectAsState()

    // Show toast and navigate to home on successful verification
    LaunchedEffect(uiState.success) {
        if (uiState.success && otp.length == 6) {
            Toast.makeText(context, "Login successful!", Toast.LENGTH_SHORT).show()
            delay(2000)  // 2 seconds delay before redirect
            onNavigateToHome()
        }
    }

    // Auto-verify when OTP is 6 digits
    LaunchedEffect(otp) {
        if (otp.length == 6 && !uiState.isLoading && uiState.error.isEmpty()) {
            authViewModel.verifyOtp(phoneNumber, otp)
        }
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
            // Header with back button
            Box(
                modifier = Modifier
                    .padding(top = 16.dp, bottom = 8.dp)
                    .align(Alignment.Start)
                    .fillMaxWidth()
            ) {
                IconButton(
                    onClick = onNavigateBack,
                    modifier = Modifier
                        .background(
                            color = if (isDarkTheme) DarkSurface else androidx.compose.ui.graphics.Color(0xFFF3F4F6),
                            shape = androidx.compose.foundation.shape.RoundedCornerShape(10.dp)
                        )
                        .padding(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = if (isDarkTheme) TextDark else TextColor,
                        modifier = Modifier.padding(4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Title
            Text(
                text = "Verify OTP",
                fontSize = 32.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = if (isDarkTheme) TextDark else TextColor,
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )

            Spacer(modifier = Modifier.height(14.dp))

            // Subtitle with phone number
            Text(
                text = "We've sent a 6-digit code to\n$phoneNumber",
                fontSize = 14.sp,
                color = if (isDarkTheme) TextDark.copy(alpha = 0.6f) else TextColor.copy(alpha = 0.6f),
                modifier = Modifier.padding(top = 8.dp, bottom = 32.dp),
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )

            // Error Message
            if (uiState.error.isNotEmpty()) {
                ErrorMessage(uiState.error)
                Spacer(modifier = Modifier.height(20.dp))
            }

            Spacer(modifier = Modifier.height(16.dp))

            // OTP Input
            Text(
                text = "Enter OTP Code",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = if (isDarkTheme) TextDark else TextColor,
                modifier = Modifier
                    .align(Alignment.Start)
                    .padding(bottom = 10.dp)
            )
            OTPTextField(
                value = otp,
                onValueChange = { otp = it }
            )

            Spacer(modifier = Modifier.height(26.dp))

            // Verify Button
            PrimaryButton(
                text = if (uiState.isLoading) "Verifying..." else "Verify OTP",
                onClick = {
                    if (otp.length == 6) {
                        authViewModel.verifyOtp(phoneNumber, otp)
                    }
                },
                isLoading = uiState.isLoading,
                enabled = otp.length == 6 && !uiState.isLoading
            )

            Spacer(modifier = Modifier.height(28.dp))

            // Resend OTP Section
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 16.dp),
                contentAlignment = Alignment.Center
            ) {
                if (resendTimer > 0) {
                    Text(
                        text = "Resend OTP in ${resendTimer}s",
                        fontSize = 13.sp,
                        color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f),
                        fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
                    )
                } else {
                    androidx.compose.foundation.layout.Row(
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Text(
                            text = "Didn't receive code? ",
                            fontSize = 13.sp,
                            color = if (isDarkTheme) TextDark.copy(alpha = 0.7f) else TextColor.copy(alpha = 0.7f),
                            fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
                        )
                        TextButton(
                            onClick = onResendOtp,
                            modifier = Modifier.padding(10.dp)
                        ) {
                            Text(
                                text = "Resend",
                                fontSize = 13.sp,
                                color = Primary,
                                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Info Text Box
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        color = Primary.copy(alpha = if (isDarkTheme) 0.12f else 0.08f),
                        shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp)
                    )
                    .border(
                        width = 1.dp,
                        color = Primary.copy(alpha = if (isDarkTheme) 0.3f else 0.2f),
                        shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp)
                    )
                    .padding(14.dp)
            ) {
                Text(
                    text = "The OTP will expire in 10 minutes. Make sure to enter it within this time.",
                    color = Primary,
                    fontSize = 12.sp,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
                )
            }

            Spacer(modifier = Modifier.height(40.dp))
        }
    }
}
