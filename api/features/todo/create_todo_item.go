package todo

import (
	"api/auth/utils"
	"api/features/todo/models/dto"
	"api/features/todo/service"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateTodoItemHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var reqBody dto.CreateTodoDto
		err := c.Bind(&reqBody)
		fmt.Printf("reqBody: %+v\n", reqBody)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		userId := utils.CurrentUser(c).UserId

		todoItem, err := service.Save(userId, reqBody)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to save todo item.",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"item": todoItem,
		})
	}
}
