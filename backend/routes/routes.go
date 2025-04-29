package routes

import (
	"net/http"

	"github-clone/backend/handlers"
)

// SetupRoutes initializes the routes for the application
func SetupRoutes(mux *http.ServeMux) {
	// Seller routes
	mux.HandleFunc("/signup/seller", handlers.SellerSignupHandler)

	// Buyer routes
	mux.HandleFunc("/signup/buyer", handlers.BuyerSignupHandler)

	//Search routes
	mux.HandleFunc("/search", handlers.SearchHandler)

	//Login routes
	mux.HandleFunc("/login", handlers.LoginHandler)

	//UserInfo route
	mux.HandleFunc("/user", handlers.GetUserData)

}
