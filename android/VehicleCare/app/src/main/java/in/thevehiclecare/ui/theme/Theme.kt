package `in`.thevehiclecare.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = PrimaryLight,
    onPrimary = Color.White,
    secondary = PrimaryLight,
    onSecondary = Color.White,
    tertiary = PrimaryLight,
    onTertiary = Color.White,
    background = DarkBg,
    onBackground = TextDark,
    surface = DarkSurface,
    onSurface = TextDark,
    error = ErrorRed,
    onError = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    onPrimary = Color.White,
    secondary = PrimaryLight,
    onSecondary = Color.White,
    tertiary = Primary,
    onTertiary = Color.White,
    background = LightBg,
    onBackground = TextLight,
    surface = LightSurface,
    onSurface = TextLight,
    error = ErrorRed,
    onError = Color.White
)

@Composable
fun VehicleCareTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}