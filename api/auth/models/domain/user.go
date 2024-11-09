package domain

import "github.com/google/uuid"

type User struct {
	UserId string `json:"userId"`
}

func NewUser(options ...UserOption) *User {
	user := &User{}

	user.UserId = uuid.NewString()

	for _, option := range options {
		option(user)
	}
	return user
}

type UserOption func(*User)

func WithUserId(userId string) UserOption {
	return func(u *User) {
		u.UserId = userId
	}
}
