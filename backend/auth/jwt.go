package auth

var jwtKey []byte

// SetJWTKey sets the key used to sign JWT tokens
func SetJWTKey(key []byte) {
	jwtKey = key
}

// GetJWTKey returns the key used to sign JWT tokens
func GetJWTKey() []byte {
	return jwtKey
}
