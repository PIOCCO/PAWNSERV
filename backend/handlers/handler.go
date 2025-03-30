package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"

	"github-clone/backend/db"
	"github-clone/backend/models"
)

// SellerSignupHandler handles seller sign-up requests
func SellerSignupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Invalid request method"}`, http.StatusMethodNotAllowed)
		return
	}

	var seller models.Seller
	if err := json.NewDecoder(r.Body).Decode(&seller); err != nil {
		log.Println("Failed to decode request body:", err)
		http.Error(w, `{"error": "Invalid request body"}`, http.StatusBadRequest)
		return
	}

	// Validate input
	if seller.Username == "" || seller.Email == "" || seller.Password == "" || seller.StoreName == "" {
		http.Error(w, `{"error": "All fields are required"}`, http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(seller.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("Failed to hash password:", err)
		http.Error(w, `{"error": "Failed to hash password"}`, http.StatusInternalServerError)
		return
	}
	seller.Password = string(hashedPassword)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := SaveSellerToMongoDB(ctx, seller); err != nil {
		log.Println("MongoDB error:", err)
		http.Error(w, `{"error": "Failed to save seller data"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Seller signed up successfully"})
}

// BuyerSignupHandler handles buyer sign-up requests
func BuyerSignupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Invalid request method"}`, http.StatusMethodNotAllowed)
		return
	}

	var buyer models.Buyer
	if err := json.NewDecoder(r.Body).Decode(&buyer); err != nil {
		log.Println("Failed to decode request body:", err)
		http.Error(w, `{"error": "Invalid request body"}`, http.StatusBadRequest)
		return
	}

	// Validate input
	if buyer.Username == "" || buyer.Email == "" || buyer.Password == "" {
		http.Error(w, `{"error": "All fields are required"}`, http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(buyer.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("Failed to hash password:", err)
		http.Error(w, `{"error": "Failed to hash password"}`, http.StatusInternalServerError)
		return
	}
	buyer.Password = string(hashedPassword)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := SaveBuyerToMongoDB(ctx, buyer); err != nil {
		log.Println("MongoDB error:", err)
		http.Error(w, `{"error": "Failed to save buyer data"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Buyer signed up successfully"})
}

func SaveSellerToMongoDB(ctx context.Context, seller models.Seller) error {
	if db.SellerCollection == nil {
		log.Println("SellerCollection is nil")
		return fmt.Errorf("seller database connection is nil")
	}

	log.Println("Inserting seller into MongoDB:", seller)

	result, err := db.SellerCollection.InsertOne(ctx, bson.M{
		"username":  seller.Username,
		"email":     seller.Email,
		"password":  seller.Password,
		"storeName": seller.StoreName,
		"createdAt": time.Now(),
	})

	if err != nil {
		log.Println("Error inserting seller:", err)
		return err
	}

	log.Println("Seller inserted successfully. Inserted ID:", result.InsertedID)
	return nil
}

// SaveBuyerToMongoDB saves a buyer to MongoDB
func SaveBuyerToMongoDB(ctx context.Context, buyer models.Buyer) error {
	if db.BuyerCollection == nil {
		log.Println("BuyerCollection is nil")
		return fmt.Errorf("buyer database connection is nil")
	}

	_, err := db.BuyerCollection.InsertOne(ctx, bson.M{
		"username":  buyer.Username,
		"email":     buyer.Email,
		"password":  buyer.Password,
		"createdAt": time.Now(),
	})
	return err
}
