package `in`.thevehiclecare.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import `in`.thevehiclecare.ui.theme.Primary
import `in`.thevehiclecare.ui.theme.PrimaryLight
import `in`.thevehiclecare.ui.theme.TextColor
import `in`.thevehiclecare.ui.theme.DarkBg
import `in`.thevehiclecare.ui.theme.TextDark
import `in`.thevehiclecare.ui.theme.LightBg
import `in`.thevehiclecare.ui.theme.DarkSurface
import `in`.thevehiclecare.ui.theme.BorderDark
import `in`.thevehiclecare.ui.theme.BorderLight
import `in`.thevehiclecare.ui.theme.SuccessGreen
import `in`.thevehiclecare.ui.theme.SuccessGreenDark
import `in`.thevehiclecare.ui.theme.ErrorRed
import `in`.thevehiclecare.ui.theme.ErrorRedDark

@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    isLoading: Boolean = false,
    enabled: Boolean = true
) {
    val isDarkTheme = isSystemInDarkTheme()
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Primary,
            contentColor = androidx.compose.ui.graphics.Color.White,
            disabledContainerColor = if (isDarkTheme) Primary.copy(alpha = 0.3f) else PrimaryLight.copy(alpha = 0.5f)
        ),
        shape = RoundedCornerShape(14.dp),
        enabled = enabled && !isLoading,
        elevation = ButtonDefaults.elevatedButtonElevation(
            defaultElevation = 4.dp,
            pressedElevation = 8.dp
        )
    ) {
        if (isLoading) {
            androidx.compose.material3.CircularProgressIndicator(
                modifier = Modifier.height(20.dp),
                color = androidx.compose.ui.graphics.Color.White,
                strokeWidth = 2.dp
            )
        } else {
            Text(
                text = text,
                fontSize = 16.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold,
                letterSpacing = 0.5.sp
            )
        }
    }
}

@Composable
fun SecondaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isDarkTheme) DarkSurface else LightBg,
            contentColor = Primary
        ),
        shape = RoundedCornerShape(14.dp),
        border = androidx.compose.foundation.BorderStroke(2.dp, Primary)
    ) {
        Text(
            text = text,
            fontSize = 16.sp,
            fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
        )
    }
}

@Composable
fun EmailTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Email Address"
) {
    val isDarkTheme = isSystemInDarkTheme()
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        placeholder = { Text(placeholder, color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f)) },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Email,
                contentDescription = "Email",
                tint = Primary
            )
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        shape = RoundedCornerShape(14.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            unfocusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            focusedBorderColor = Primary,
            unfocusedBorderColor = if (isDarkTheme) BorderDark else BorderLight,
            focusedTextColor = if (isDarkTheme) TextDark else TextColor,
            unfocusedTextColor = if (isDarkTheme) TextDark else TextColor
        ),
        singleLine = true
    )
}

@Composable
fun PhoneTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Phone Number"
) {
    val isDarkTheme = isSystemInDarkTheme()
    OutlinedTextField(
        value = value,
        onValueChange = { if (it.length <= 13) onValueChange(it) },
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        placeholder = { Text(placeholder, color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f)) },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Phone,
                contentDescription = "Phone",
                tint = Primary
            )
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
        shape = RoundedCornerShape(14.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            unfocusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            focusedBorderColor = Primary,
            unfocusedBorderColor = if (isDarkTheme) BorderDark else BorderLight,
            focusedTextColor = if (isDarkTheme) TextDark else TextColor,
            unfocusedTextColor = if (isDarkTheme) TextDark else TextColor
        ),
        singleLine = true
    )
}

@Composable
fun PasswordTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Password"
) {
    val isDarkTheme = isSystemInDarkTheme()
    var passwordVisible by remember { mutableStateOf(false) }

    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        placeholder = { Text(placeholder, color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f)) },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Lock,
                contentDescription = "Password",
                tint = Primary
            )
        },
        trailingIcon = {
            val image = if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff
            IconButton(onClick = { passwordVisible = !passwordVisible }) {
                Icon(image, contentDescription = if (passwordVisible) "Hide" else "Show", tint = Primary)
            }
        },
        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        shape = RoundedCornerShape(14.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            unfocusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            focusedBorderColor = Primary,
            unfocusedBorderColor = if (isDarkTheme) BorderDark else BorderLight,
            focusedTextColor = if (isDarkTheme) TextDark else TextColor,
            unfocusedTextColor = if (isDarkTheme) TextDark else TextColor
        ),
        singleLine = true
    )
}

@Composable
fun NameTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Full Name"
) {
    val isDarkTheme = isSystemInDarkTheme()
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        placeholder = { Text(placeholder, color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f)) },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Text),
        shape = RoundedCornerShape(14.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            unfocusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            focusedBorderColor = Primary,
            unfocusedBorderColor = if (isDarkTheme) BorderDark else BorderLight,
            focusedTextColor = if (isDarkTheme) TextDark else TextColor,
            unfocusedTextColor = if (isDarkTheme) TextDark else TextColor
        ),
        singleLine = true
    )
}

@Composable
fun OTPTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    OutlinedTextField(
        value = value,
        onValueChange = { if (it.length <= 6) onValueChange(it) },
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        placeholder = { Text("000000", color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f)) },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
        shape = RoundedCornerShape(14.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            unfocusedContainerColor = if (isDarkTheme) DarkSurface else LightBg,
            focusedBorderColor = Primary,
            unfocusedBorderColor = if (isDarkTheme) BorderDark else BorderLight,
            focusedTextColor = if (isDarkTheme) TextDark else TextColor,
            unfocusedTextColor = if (isDarkTheme) TextDark else TextColor
        ),
        singleLine = true
    )
}

@Composable
fun GoogleSignInButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isDarkTheme) DarkSurface else androidx.compose.ui.graphics.Color(0xFFFEFEFE),
            contentColor = if (isDarkTheme) TextDark else TextColor
        ),
        shape = RoundedCornerShape(14.dp),
        border = androidx.compose.foundation.BorderStroke(
            width = 1.dp,
            color = if (isDarkTheme) BorderDark else BorderLight
        )
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "G",
                fontSize = 18.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = if (isDarkTheme) TextDark else TextColor
            )
            Spacer(modifier = Modifier.padding(8.dp))
            Text(
                "Continue with Google",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Medium,
                color = if (isDarkTheme) TextDark else TextColor
            )
        }
    }
}

@Composable
fun FacebookSignInButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isDarkTheme) DarkSurface else androidx.compose.ui.graphics.Color(0xFFFEFEFE),
            contentColor = if (isDarkTheme) TextDark else TextColor
        ),
        shape = RoundedCornerShape(14.dp),
        border = androidx.compose.foundation.BorderStroke(
            width = 1.dp,
            color = if (isDarkTheme) BorderDark else BorderLight
        )
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "f",
                fontSize = 18.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                color = if (isDarkTheme) TextDark else TextColor
            )
            Spacer(modifier = Modifier.padding(8.dp))
            Text(
                "Continue with Facebook",
                fontSize = 14.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Medium,
                color = if (isDarkTheme) TextDark else TextColor
            )
        }
    }
}

@Composable
fun DividerWithText(
    text: String,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        androidx.compose.material3.Divider(
            modifier = Modifier
                .weight(1f)
                .height(1.dp),
            color = if (isDarkTheme) BorderDark else BorderLight
        )
        Text(
            text = text,
            modifier = Modifier.padding(horizontal = 12.dp),
            fontSize = 12.sp,
            color = if (isDarkTheme) TextDark.copy(alpha = 0.5f) else TextColor.copy(alpha = 0.5f),
            fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
        )
        androidx.compose.material3.Divider(
            modifier = Modifier
                .weight(1f)
                .height(1.dp),
            color = if (isDarkTheme) BorderDark else BorderLight
        )
    }
}

@Composable
fun DoNotHaveAccountText(
    onSignUpClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            "Don't have an account? ",
            fontSize = 13.sp,
            color = if (isDarkTheme) TextDark.copy(alpha = 0.7f) else TextColor.copy(alpha = 0.7f),
            fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
        )
        TextButton(
            onClick = onSignUpClick,
            modifier = Modifier.padding(0.dp)
        ) {
            Text(
                "Sign up",
                fontSize = 13.sp,
                color = Primary,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
            )
        }
    }
}

@Composable
fun AlreadyHaveAccountText(
    onSignInClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            "Already have an account? ",
            fontSize = 13.sp,
            color = if (isDarkTheme) TextDark.copy(alpha = 0.7f) else TextColor.copy(alpha = 0.7f),
            fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
        )
        TextButton(
            onClick = onSignInClick,
            modifier = Modifier.padding(0.dp)
        ) {
            Text(
                "Sign in",
                fontSize = 13.sp,
                color = Primary,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
            )
        }
    }
}

@Composable
fun ErrorMessage(
    message: String,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    if (message.isNotEmpty()) {
        Box(
            modifier = modifier
                .fillMaxWidth()
                .background(
                    color = if (isDarkTheme) ErrorRed.copy(alpha = 0.15f) else ErrorRed.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(12.dp)
                )
                .border(
                    width = 1.dp,
                    color = if (isDarkTheme) ErrorRed.copy(alpha = 0.5f) else ErrorRed.copy(alpha = 0.3f),
                    shape = RoundedCornerShape(12.dp)
                )
                .padding(14.dp)
        ) {
            Text(
                text = message,
                color = if (isDarkTheme) ErrorRedDark else ErrorRed,
                fontSize = 13.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
            )
        }
    }
}

@Composable
fun SuccessMessage(
    message: String,
    modifier: Modifier = Modifier
) {
    val isDarkTheme = isSystemInDarkTheme()
    if (message.isNotEmpty()) {
        Box(
            modifier = modifier
                .fillMaxWidth()
                .background(
                    color = if (isDarkTheme) SuccessGreen.copy(alpha = 0.15f) else SuccessGreen.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(12.dp)
                )
                .border(
                    width = 1.dp,
                    color = if (isDarkTheme) SuccessGreen.copy(alpha = 0.5f) else SuccessGreen.copy(alpha = 0.3f),
                    shape = RoundedCornerShape(12.dp)
                )
                .padding(14.dp)
        ) {
            androidx.compose.foundation.layout.Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                androidx.compose.material.icons.Icons.Default.Check.let { checkIcon ->
                    Icon(
                        imageVector = checkIcon,
                        contentDescription = "Success",
                        tint = if (isDarkTheme) SuccessGreenDark else SuccessGreen,
                        modifier = Modifier
                            .width(20.dp)
                            .height(20.dp)
                            .padding(end = 10.dp)
                    )
                }
                Text(
                    text = message,
                    color = if (isDarkTheme) SuccessGreenDark else SuccessGreen,
                    fontSize = 13.sp,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Medium
                )
            }
        }
    }
}
