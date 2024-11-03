package todo

import (
	"api/features/todo/dto"
	"api/features/todo/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

func CreateTodoItemHandler(service *service.TodoService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var reqBody dto.CreateTodoDto
		err := c.Bind(&reqBody)
		fmt.Printf("reqBody: %+v\n", reqBody)
		if err != nil {
			c.JSON(400, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		todoItem := service.Save(reqBody)

		c.JSON(200, gin.H{
			"todoItem": todoItem,
		})
	}
}
