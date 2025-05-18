package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github-clone/backend/db"
	"github-clone/backend/models"
	"github-clone/backend/auth"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

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

	var loginData models.Seller
	if err := json.NewDecoder(r.Body).Decode(&loginData); err != nil {
		jsonResponse(w, map[string]string{"message": "Invalid request body"}, http.StatusBadRequest)
		return
	}

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

	err = bcrypt.CompareHashAndPassword([]byte(seller.Password), []byte(loginData.Password))
	if err != nil {
		jsonResponse(w, map[string]string{"message": "Invalid email or password"}, http.StatusUnauthorized)
		return
	}

	claims := jwt.RegisteredClaims{
		Subject:   seller.Email,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(auth.GetJWTKey()) // ✅ use helper
	if err != nil {
		jsonResponse(w, map[string]string{"message": "Failed to generate token"}, http.StatusInternalServerError)
		return
	}

	jsonResponse(w, map[string]string{
		"message":  "Login successful",
		"username": seller.Username,
		"token":    tokenString,
	}, http.StatusOK)
}
