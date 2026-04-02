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
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import `in`.thevehiclecare.ui.components.NameTextField
import `in`.thevehiclecare.ui.components.EmailTextField
import `in`.thevehiclecare.ui.components.PhoneTextField
import `in`.thevehiclecare.ui.components.PrimaryButton
import `in`.thevehiclecare.ui.components.ErrorMessage
import `in`.thevehiclecare.ui.components.AlreadyHaveAccountText
import `in`.thevehiclecare.ui.components.DividerWithText
import `in`.thevehiclecare.ui.components.GoogleSignInButton
import `in`.thevehiclecare.ui.components.FacebookSignInButton
import `in`.thevehiclecare.ui.theme.Primary
import `in`.thevehiclecare.ui.theme.TextColor
import `in`.thevehiclecare.ui.theme.DarkBg
import `in`.thevehiclecare.ui.theme.LightBg
import `in`.thevehiclecare.ui.theme.DarkSurface
import `in`.thevehiclecare.ui.theme.TextDark
import `in`.thevehiclecare.viewmodel.AuthViewModel
import androidx.compose.material3.MaterialTheme

@Composable
fun RegisterScreen(
    authViewModel: AuthViewModel,
    onNavigateToLogin: () -> Unit,
    onNavigateBack: () -> Unit
) {
    val isDarkTheme = isSystemInDarkTheme()
    val backgroundColor = if (isDarkTheme) DarkBg else Color.White
    val scrollState = rememberScrollState()

    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phoneNumber by remember { mutableStateOf("+91") }

    val uiState by authViewModel.registerState.collectAsState()

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
            // Header with back button
            Box(
                modifier = Modifier
                    .padding(top = 16.dp, bottom = 8.dp)
                    .align(Alignment.Start)
            ) {
                IconButton(
                    onClick = onNavigateBack,
                    modifier = Modifier
                        .background(
                            color = if (isDarkTheme) DarkSurface else LightBg,
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

            Spacer(modifier = Modifier.height(12.dp))

            // Title Section
            Text(
                text = "Create Account",
                fontSize = 32.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = if (isDarkTheme) TextDark else TextColor,
                modifier = Modifier.padding(top = 8.dp)
            )

            Text(
                text = "Join us and start managing your vehicle care",
                fontSize = 14.sp,
                color = if (isDarkTheme) TextDark.copy(alpha = 0.6f) else TextColor.copy(alpha = 0.6f),
                modifier = Modifier.padding(top = 8.dp, bottom = 28.dp)
            )

            // Error Message
            if (uiState.error.isNotEmpty()) {
                ErrorMessage(uiState.error)
                Spacer(modifier = Modifier.height(20.dp))
            }

            // Full Name Input
            Text(
                text = "Full Name",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = if (isDarkTheme) TextDark else TextColor,
                modifier = Modifier.padding(bottom = 10.dp)
            )
            NameTextField(
                value = name,
                onValueChange = { name = it },
                placeholder = "Enter your full name"
            )
            Spacer(modifier = Modifier.height(20.dp))

            // Email Input
            Text(
                text = "Email Address",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = if (isDarkTheme) TextDark else TextColor,
                modifier = Modifier.padding(bottom = 10.dp)
            )
            EmailTextField(
                value = email,
                onValueChange = { email = it },
                placeholder = "your@email.com"
            )
            Spacer(modifier = Modifier.height(20.dp))

            // Phone Number Input
            Text(
                text = "Phone Number",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = if (isDarkTheme) TextDark else TextColor,
                modifier = Modifier.padding(bottom = 10.dp)
            )
            PhoneTextField(
                value = phoneNumber,
                onValueChange = { phoneNumber = it },
                placeholder = "+91 your number"
            )
            Spacer(modifier = Modifier.height(28.dp))

            // Create Account Button
            PrimaryButton(
                text = "Create Account",
                onClick = {
                    authViewModel.register(
                        phoneNumber = phoneNumber,
                        name = name,
                        email = email
                    )
                    // Navigate to login after successful registration
                    if (uiState.success) {
                        onNavigateToLogin()
                    }
                },
                isLoading = uiState.isLoading,
                enabled = name.isNotEmpty() && email.isNotEmpty() && phoneNumber.length > 3
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Terms Text
            Text(
                text = "By creating an account, you agree to our Terms of Service and Privacy Policy",
                fontSize = 11.sp,
                color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp),
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Divider
            DividerWithText("Or register with")

            Spacer(modifier = Modifier.height(20.dp))

            // Google Sign In
            GoogleSignInButton(onClick = { /* Handle Google Sign In */ })

            Spacer(modifier = Modifier.height(14.dp))

            // Facebook Sign In
            FacebookSignInButton(onClick = { /* Handle Facebook Sign In */ })

            Spacer(modifier = Modifier.height(32.dp))

            // Already have account
            AlreadyHaveAccountText(onSignInClick = onNavigateToLogin)

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
