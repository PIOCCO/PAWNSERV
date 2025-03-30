package main

import (
	"fmt"
	"log"
	"net/http"

	"github-clone/backend/db"
	"github-clone/backend/routes"

	"github.com/rs/cors"
)

func main() {
	// Initialize MongoDB connection
	
	err := db.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	mux := http.NewServeMux()

	// Register routes
	routes.SetupRoutes(mux)

	// Configure CORS
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	port := "9090"
	fmt.Println("Server is running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
