package mapping

import (
	"api/features/todo/models/domain"
	"api/features/todo/models/dto"
)

func ToTodoDto(todo *domain.Todo) *dto.TodoDto {
	return dto.NewTodoDto(todo.Label, todo.IsCompleted, dto.WithTodoId(todo.TodoId), dto.WithCreatedAt(todo.CreatedAt))
}

func CreateTodoDtoToDomain(createDto *dto.CreateTodoDto) *domain.Todo {
	return domain.NewTodo(createDto.Label, createDto.IsCompleted)
}
