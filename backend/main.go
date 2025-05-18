package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github-clone/backend/db"
	"github-clone/backend/auth"
	"github-clone/backend/routes"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	fmt.Println("🔥 Starting main.go now")

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("❌ Failed to load .env file: %v", err)
	}
	fmt.Println("✅ .env loaded successfully")

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("🚫 JWT_SECRET not set in environment")
	}
	auth.SetJWTKey([]byte(jwtSecret))
	fmt.Println("🔑 JWT key set successfully")

	err = db.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("❌ Failed to connect to MongoDB: %v", err)
	}

	mux := http.NewServeMux()
	routes.SetupRoutes(mux)

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	port := "9090"
	fmt.Println("🚀 Server is running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
