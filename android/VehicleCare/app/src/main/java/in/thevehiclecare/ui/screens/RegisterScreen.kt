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
import androidx.compose.material.icons.filled.ArrowBack
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
    val scope = rememberCoroutineScope()

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
                text = "Create Account",
                fontSize = 32.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = TextColor,
                modifier = Modifier.padding(top = 8.dp)
            )

            Text(
                text = "Join us and start your journey",
                fontSize = 14.sp,
                color = androidx.compose.ui.graphics.Color.Gray,
                modifier = Modifier.padding(top = 8.dp, bottom = 32.dp)
            )

            // Error Message
            if (uiState.error.isNotEmpty()) {
                ErrorMessage(uiState.error)
                Spacer(modifier = Modifier.height(16.dp))
            }

            // Name Input
            Text(
                text = "Full Name",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = TextColor,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            NameTextField(
                value = name,
                onValueChange = { name = it },
                placeholder = "Enter your full name"
            )
            Spacer(modifier = Modifier.height(16.dp))

            // Email Input
            Text(
                text = "Email Address",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                color = TextColor,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            EmailTextField(
                value = email,
                onValueChange = { email = it },
                placeholder = "your@email.com"
            )
            Spacer(modifier = Modifier.height(16.dp))

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

            // Register Button
            PrimaryButton(
                text = "Create Account",
                onClick = {
                    authViewModel.register(
                        phoneNumber = phoneNumber,
                        name = name,
                        email = email
                    )
                },
                isLoading = uiState.isLoading,
                enabled = name.isNotEmpty() && email.isNotEmpty() && phoneNumber.length > 3
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Divider
            DividerWithText("Or register with")

            Spacer(modifier = Modifier.height(16.dp))

            // Google Sign In
            GoogleSignInButton(onClick = { /* Handle Google Sign In */ })

            Spacer(modifier = Modifier.height(12.dp))

            // Facebook Sign In
            FacebookSignInButton(onClick = { /* Handle Facebook Sign In */ })

            Spacer(modifier = Modifier.height(32.dp))

            // Already have account
            AlreadyHaveAccountText(onSignInClick = onNavigateToLogin)

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}
