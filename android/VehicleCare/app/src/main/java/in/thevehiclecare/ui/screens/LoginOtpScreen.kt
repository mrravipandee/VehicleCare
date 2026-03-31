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
import `in`.thevehiclecare.ui.components.PhoneTextField
import `in`.thevehiclecare.ui.components.PrimaryButton
import `in`.thevehiclecare.ui.components.SecondaryButton
import `in`.thevehiclecare.ui.components.ErrorMessage
import `in`.thevehiclecare.ui.components.DividerWithText
import `in`.thevehiclecare.ui.components.GoogleSignInButton
import `in`.thevehiclecare.ui.components.FacebookSignInButton
import `in`.thevehiclecare.ui.components.DoNotHaveAccountText
import `in`.thevehiclecare.ui.theme.Primary
import `in`.thevehiclecare.ui.theme.TextColor
import `in`.thevehiclecare.ui.theme.DarkBg
import `in`.thevehiclecare.viewmodel.AuthViewModel
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.MaterialTheme

@Composable
fun LoginOtpScreen(
    authViewModel: AuthViewModel,
    onNavigateToVerifyOtp: (String) -> Unit,
    onNavigateToRegister: () -> Unit,
    onNavigateBack: () -> Unit
) {
    val isDarkTheme = isSystemInDarkTheme()
    val backgroundColor = if (isDarkTheme) DarkBg else Color.White
    val scrollState = rememberScrollState()

    var phoneNumber by remember { mutableStateOf("+91") }

    val uiState by authViewModel.loginOtpState.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundColor)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(horizontal = 24.dp)
        ) {
            // Header
            Box(
                modifier = Modifier
                    .padding(top = 16.dp)
                    .align(Alignment.Start)
            ) {
                IconButton(onClick = onNavigateBack) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = TextColor
                    )
                }
            }

            // Title
            Text(
                text = "Login with OTP",
                fontSize = 32.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = TextColor,
                modifier = Modifier.padding(top = 8.dp)
            )

            Text(
                text = "Enter your phone number to receive OTP",
                fontSize = 14.sp,
                color = androidx.compose.ui.graphics.Color.Gray,
                modifier = Modifier.padding(top = 8.dp, bottom = 32.dp)
            )

            // Error Message
            if (uiState.error.isNotEmpty()) {
                ErrorMessage(uiState.error)
                Spacer(modifier = Modifier.height(16.dp))
            }

            // Info Box
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        color = Primary.copy(alpha = 0.1f),
                        shape = androidx.compose.foundation.shape.RoundedCornerShape(8.dp)
                    )
                    .padding(12.dp)
            ) {
                androidx.compose.foundation.layout.Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = "Info",
                        tint = Primary,
                        modifier = Modifier.padding(end = 8.dp)
                    )
                    Text(
                        text = "We'll send you a 6-digit OTP code for verification",
                        color = Primary,
                        fontSize = 12.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Phone Number Input
            Text(
                text = "Phone Number",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = TextColor,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            PhoneTextField(
                value = phoneNumber,
                onValueChange = { phoneNumber = it },
                placeholder = "+91 your number"
            )
            Spacer(modifier = Modifier.height(24.dp))

            // Send OTP Button
            PrimaryButton(
                text = if (uiState.isLoading) "Sending OTP..." else "Send OTP",
                onClick = {
                    authViewModel.sendLoginOtp(phoneNumber)
                    if (!uiState.isLoading && uiState.error.isEmpty()) {
                        onNavigateToVerifyOtp(phoneNumber)
                    }
                },
                isLoading = uiState.isLoading,
                enabled = phoneNumber.length > 3
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Divider
            DividerWithText("Or login with")

            Spacer(modifier = Modifier.height(16.dp))

            // Google Sign In
            GoogleSignInButton(onClick = { /* Handle Google Sign In */ })

            Spacer(modifier = Modifier.height(12.dp))

            // Facebook Sign In
            FacebookSignInButton(onClick = { /* Handle Facebook Sign In */ })

            Spacer(modifier = Modifier.height(32.dp))

            // Sign Up Link
            DoNotHaveAccountText(onSignUpClick = onNavigateToRegister)

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
