package todo

import (
	"api/features/todo/dto"
	"api/features/todo/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UpdateTodoItemHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		todoId := c.Param("todoId")
		var reqBody dto.UpdateTodoDto
		err := c.Bind(&reqBody)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body.",
			})
			return
		}

		todoItem, err := service.SetTodoCompleted(todoId, reqBody.Completed)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to save todo item.",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"item": todoItem,
		})
	}
}
