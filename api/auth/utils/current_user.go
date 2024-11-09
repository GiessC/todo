package utils

import (
	"api/auth/models/domain"
	"api/config/app"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func CurrentUser(c *gin.Context) *domain.User {
	jwtSecret := app.GetConfigInstance().JwtSecret
	authHeader := c.GetHeader("Authorization")
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	token, _ := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	claims, _ := token.Claims.(*jwt.RegisteredClaims)
	user := domain.User{
		UserId: claims.Subject,
	}
	return &user
}
