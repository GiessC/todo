package mapping

import (
	"api/features/todo/models/domain"
	"api/features/todo/models/dto"
)

func ToTodoDto(todo *domain.Todo) *dto.TodoDto {
	return dto.NewTodoDto(todo.Label, todo.IsCompleted, dto.WithTodoId(todo.TodoId), dto.WithCreatedAt(todo.CreatedAt))
}

func CreateTodoDtoToDomain(userId string, createDto *dto.CreateTodoDto) *domain.Todo {
	return domain.NewTodo(userId, createDto.Label, createDto.IsCompleted)
}
