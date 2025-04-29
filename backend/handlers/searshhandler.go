package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github-clone/backend/db"
	"go.mongodb.org/mongo-driver/bson"
	
)

// SearchHandler handles search requests for both buyers and sellers
func SearchHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	if query == "" {
		http.Error(w, `{"error": "Query parameter is required"}`, http.StatusBadRequest)
		return
	}

	// Search in both buyers and sellers collections
	sellers, err := searchSellers(query)
	if err != nil {
		http.Error(w, `{"error": "Error searching sellers"}`, http.StatusInternalServerError)
		return
	}

	buyers, err := searchBuyers(query)
	if err != nil {
		http.Error(w, `{"error": "Error searching buyers"}`, http.StatusInternalServerError)
		return
	}

	// Combine results from both sellers and buyers
	users := append(sellers, buyers...)

	// Send results back to client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// searchSellers searches the sellers collection for a query
func searchSellers(query string) ([]map[string]interface{}, error) {
	filter := bson.M{
		"username": bson.M{"$regex": query, "$options": "i"}, // Case-insensitive search
	}

	cursor, err := db.SellerCollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var results []map[string]interface{}
	for cursor.Next(context.Background()) {
		var seller map[string]interface{}
		if err := cursor.Decode(&seller); err != nil {
			return nil, err
		}
		results = append(results, seller)
	}

	return results, nil
}

// searchBuyers searches the buyers collection for a query
func searchBuyers(query string) ([]map[string]interface{}, error) {
	filter := bson.M{
		"username": bson.M{"$regex": query, "$options": "i"}, // Case-insensitive search
	}

	cursor, err := db.BuyerCollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var results []map[string]interface{}
	for cursor.Next(context.Background()) {
		var buyer map[string]interface{}
		if err := cursor.Decode(&buyer); err != nil {
			return nil, err
		}
		results = append(results, buyer)
	}

	return results, nil
}
