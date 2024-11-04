package todo

import (
	"api/features/todo/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTodoListHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Query("userId")

		if userId == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "User ID is required.",
			})
			return
		}

		todoList, err := service.FindAllByUser(userId)
		log.Printf("Todo list: %+v", todoList)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get to-do list.",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"todoList": todoList,
		})
	}
}
