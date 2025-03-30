package models
import "time"


type User struct {
    ID       string `json:"id"`
    Name     string `json:"name"`
    Email    string `json:"email"`
    Password string `json:"password"`
}


type Seller struct {
	Username        string   `json:"username"`
	Email           string   `json:"email"`
	Password        string   `json:"password"`
	StoreName       string   `json:"storeName"`
	BusinessCategory []string `json:"businessCategory"`
	ContactNumber   string   `json:"contactNumber"`
	Description     string   `json:"description"`
	CreatedAt       time.Time `json:"createdAt"`
}

type Buyer struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
