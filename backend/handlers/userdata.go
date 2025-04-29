package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github-clone/backend/db"
	"github-clone/backend/models"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
)


func GetUserData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract JWT from Authorization header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Unauthorized: missing Authorization header", http.StatusUnauthorized)
		return
	}

	// Validate the format
	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		http.Error(w, "Unauthorized: invalid Authorization header format", http.StatusUnauthorized)
		return
	}
	tokenString := tokenParts[1]

	// Parse and validate the token
	claims := &jwt.RegisteredClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		http.Error(w, "Unauthorized: invalid or expired token", http.StatusUnauthorized)
		return
	}

	sellerEmail := claims.Subject
	log.Println("🔍 Searching seller with email:", sellerEmail)

	// Query the DB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var seller models.Seller
	err = db.SellerCollection.FindOne(ctx, bson.M{"email": sellerEmail}).Decode(&seller)
	if err != nil {
		log.Println("❌ Error finding seller:", err)
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Respond with seller data
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(seller); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		log.Println("❌ Error encoding seller data:", err)
		return
	}
	log.Println("✅ Seller data successfully returned")
}
