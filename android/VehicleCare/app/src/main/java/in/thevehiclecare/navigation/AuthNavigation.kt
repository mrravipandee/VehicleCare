package `in`.thevehiclecare.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import `in`.thevehiclecare.ui.screens.RegisterScreen
import `in`.thevehiclecare.ui.screens.LoginOtpScreen
import `in`.thevehiclecare.ui.screens.VerifyOtpScreen
import `in`.thevehiclecare.viewmodel.AuthViewModel

sealed class Screen(val route: String) {
    data object Register : Screen("register")
    data object LoginOtp : Screen("login_otp")
    data object VerifyOtp : Screen("verify_otp/{phoneNumber}") {
        fun createRoute(phoneNumber: String) = "verify_otp/$phoneNumber"
    }
    data object Home : Screen("home")
}

@Composable
fun AuthNavigation(authViewModel: AuthViewModel) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Register.route
    ) {
        composable(Screen.Register.route) {
            RegisterScreen(
                authViewModel = authViewModel,
                onNavigateToLogin = {
                    navController.navigate(Screen.LoginOtp.route) {
                        popUpTo(Screen.Register.route) { saveState = true }
                        launchSingleTop = true
                    }
                },
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }

        composable(Screen.LoginOtp.route) {
            LoginOtpScreen(
                authViewModel = authViewModel,
                onNavigateToVerifyOtp = { phoneNumber ->
                    navController.navigate(Screen.VerifyOtp.createRoute(phoneNumber)) {
                        popUpTo(Screen.LoginOtp.route) { saveState = true }
                        launchSingleTop = true
                    }
                },
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route) {
                        popUpTo(Screen.LoginOtp.route) { inclusive = true }
                    }
                },
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }

        composable(Screen.VerifyOtp.route) { backStackEntry ->
            val phoneNumber = backStackEntry.arguments?.getString("phoneNumber") ?: "+91"
            VerifyOtpScreen(
                authViewModel = authViewModel,
                phoneNumber = phoneNumber,
                onNavigateToHome = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Register.route) { inclusive = true }
                    }
                },
                onNavigateBack = {
                    navController.popBackStack()
                },
                onResendOtp = {
                    authViewModel.sendLoginOtp(phoneNumber)
                }
            )
        }

        composable(Screen.Home.route) {
            // Home screen placeholder
            androidx.compose.material3.Text("Welcome to Home!")
        }
    }
}
