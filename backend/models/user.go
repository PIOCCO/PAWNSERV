package models
import (
	"go.mongodb.org/mongo-driver/bson/primitive"
    "time"
)


type User struct {
	ID             primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Username       string             `json:"username" bson:"username"`
	ProfilePicture string             `json:"profilePicture" bson:"profilePicture"`
	Bio            string             `json:"bio" bson:"bio"`
	Posts          int                `json:"posts" bson:"posts"`
	Followers      int                `json:"followers" bson:"followers"`
	Following      int                `json:"following" bson:"following"`
	PostsData      []string           `json:"postsData" bson:"postsData"`
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
