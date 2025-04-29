package handlers

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github-clone/backend/db"
	"github-clone/backend/models"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// Secret key for signing JWTs — should come from environment variables in production
var jwtKey []byte

func init() {
	// 32 bytes = 256-bit key
	key := make([]byte, 32)
	_, err := rand.Read(key)
	if err != nil {
		log.Fatalf("❌ Failed to generate random JWT key: %v", err)
	}
	jwtKey = key
	log.Println("🔑 JWT key generated")
}

// Utility function for sending JSON response
func jsonResponse(w http.ResponseWriter, data interface{}, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// LoginHandler for handling login requests
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonResponse(w, map[string]string{"message": "Method not allowed"}, http.StatusMethodNotAllowed)
		return
	}

	// Parse login data
	var loginData models.Seller
	if err := json.NewDecoder(r.Body).Decode(&loginData); err != nil {
		jsonResponse(w, map[string]string{"message": "Invalid request body"}, http.StatusBadRequest)
		return
	}

	// Find the user by email
	var seller models.Seller
	err := db.SellerCollection.FindOne(context.TODO(), bson.M{"email": loginData.Email}).Decode(&seller)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			jsonResponse(w, map[string]string{"message": "Invalid email or password"}, http.StatusUnauthorized)
		} else {
			jsonResponse(w, map[string]string{"message": "Server error"}, http.StatusInternalServerError)
		}
		return
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(seller.Password), []byte(loginData.Password))
	if err != nil {
		jsonResponse(w, map[string]string{"message": "Invalid email or password"}, http.StatusUnauthorized)
		return
	}

	// Generate JWT
	claims := jwt.RegisteredClaims{
		Subject:   seller.Email,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		jsonResponse(w, map[string]string{"message": "Failed to generate token"}, http.StatusInternalServerError)
		return
	}

	// Respond with the JWT and username
	jsonResponse(w, map[string]string{
		"message":  "Login successful",
		"username": seller.Username,
		"token":    tokenString,
	}, http.StatusOK)
	
}
