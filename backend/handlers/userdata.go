package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github-clone/backend/db"
	"github-clone/backend/middleware"
	"github-clone/backend/models"

	"go.mongodb.org/mongo-driver/bson"
)

// GetUserData returns user data for the authenticated user
func GetUserData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// ✅ Extract email from context (already verified by middleware)
	email, ok := r.Context().Value(middleware.UserContextKey).(string)
	if !ok || email == "" {
		http.Error(w, "Unauthorized: email not found in context", http.StatusUnauthorized)
		return
	}

	log.Println("🔍 Looking for seller with email:", email)

	// Query the MongoDB database for the seller
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var seller models.Seller
	err := db.SellerCollection.FindOne(ctx, bson.M{"email": email}).Decode(&seller)
	if err != nil {
		log.Println("❌ Seller not found:", err)
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Return the user data as JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(seller); err != nil {
		log.Println("❌ Failed to encode seller response:", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}

	log.Println("✅ Seller data returned successfully")
}
