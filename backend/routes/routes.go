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
}
