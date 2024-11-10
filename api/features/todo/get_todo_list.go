package todo

import (
	"api/auth/utils"
	"api/features/todo/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTodoListHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := utils.CurrentUser(c).UserId

		todoList, err := service.FindAllByUser(userId)
		log.Printf("Todo list: %+v", todoList)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get to-do list.",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"items": todoList,
		})
	}
}
