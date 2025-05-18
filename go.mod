module github-clone

go 1.23.0

toolchain go1.23.7

require (
	github.com/Azure/azure-sdk-for-go/sdk/storage/azblob v1.6.0
	github.com/golang-jwt/jwt/v5 v5.2.1
	go.mongodb.org/mongo-driver v1.17.3
)

require github.com/golang-jwt/jwt/v4 v4.5.2 // direct

require github.com/joho/godotenv v1.5.1 // direct

require (
	github.com/Azure/azure-sdk-for-go/sdk/azcore v1.17.0 // indirect
	github.com/Azure/azure-sdk-for-go/sdk/internal v1.10.0 // indirect
	github.com/golang/snappy v0.0.4 // indirect
	github.com/klauspost/compress v1.16.7 // indirect
	github.com/montanaflynn/stats v0.7.1 // indirect
	github.com/rs/cors v1.11.1 // direct
	github.com/xdg-go/pbkdf2 v1.0.0 // indirect
	github.com/xdg-go/scram v1.1.2 // indirect
	github.com/xdg-go/stringprep v1.0.4 // indirect
	github.com/youmark/pkcs8 v0.0.0-20240726163527-a2c0da244d78 // indirect
	golang.org/x/net v0.37.0 // indirect
)

require (
	golang.org/x/crypto v0.36.0 // direct
	golang.org/x/sync v0.12.0 // indirect
	golang.org/x/text v0.23.0 // indirect
)
