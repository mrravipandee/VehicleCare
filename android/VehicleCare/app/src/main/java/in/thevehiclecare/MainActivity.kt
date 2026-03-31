package `in`.thevehiclecare

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import `in`.thevehiclecare.navigation.AuthNavigation
import `in`.thevehiclecare.ui.theme.VehicleCareTheme
import `in`.thevehiclecare.viewmodel.AuthViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VehicleCareTheme {
                val authViewModel: AuthViewModel = viewModel()
                AuthNavigation(authViewModel = authViewModel)
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    VehicleCareTheme {
        val authViewModel: AuthViewModel = viewModel()
        AuthNavigation(authViewModel = authViewModel)
    }
}