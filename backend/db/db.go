package db

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var SellerCollection *mongo.Collection
var BuyerCollection *mongo.Collection

// ConnectToMongoDB initializes the MongoDB client and collections
func ConnectToMongoDB() error {
	// Replace with your MongoDB URI (default localhost for development)
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017") 

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return fmt.Errorf("failed to connect to MongoDB: %v", err)
	}

	// Set the global client variable
	Client = client

	// Choose the database and collections
	db := client.Database("github-clone") // Replace with your actual database name
	SellerCollection = db.Collection("sellers")
	BuyerCollection = db.Collection("buyers")

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		return fmt.Errorf("failed to ping MongoDB: %v", err)
	}

	log.Println("Successfully connected to MongoDB")
	return nil
}
