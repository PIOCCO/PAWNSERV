package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github-clone/backend/auth"

	"github.com/golang-jwt/jwt/v4"
)

type key int

const UserContextKey key = 0

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			log.Println("🚫 Authorization header missing")
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			log.Printf("🚫 Authorization header format must be Bearer {token}, got: %s", authHeader)
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]
		log.Println("🔑 JWT token received:", tokenString)

		claims := &jwt.RegisteredClaims{}

		// Parse token with the same secret key used to sign it
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return auth.GetJWTKey(), nil
		})

		if err != nil {
			log.Printf("❌ JWT parse error: %v", err)
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			log.Println("❌ JWT token invalid")
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		// Log the claims to see what we got
		log.Printf("✅ JWT token valid! Claims: Subject=%s, ExpiresAt=%v, IssuedAt=%v", claims.Subject, claims.ExpiresAt, claims.IssuedAt)

		if claims.Subject == "" {
			log.Println("🚫 JWT claims subject is empty")
			http.Error(w, "Unauthorized: subject missing in token", http.StatusUnauthorized)
			return
		}

		// Add the user email (subject) to request context for handlers to use
		ctx := context.WithValue(r.Context(), UserContextKey, claims.Subject)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
