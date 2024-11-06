package todo

import (
	"api/exceptions"
	"api/features/todo/service"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

func DeleteTodoItemHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		todoId := c.Param("todoId")
		if todoId == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		todoItem, err := service.Delete(todoId)

		if err != nil {
			if errors.As(err, &exceptions.BadRequestException{}) {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": err.Error(),
				})
				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to delete todo item.",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"item":    todoItem,
			"message": "deleted",
		})
	}
}
