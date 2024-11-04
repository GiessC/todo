package service

import (
	"api/features/todo/dto"
	"api/features/todo/mapping"
	"api/features/todo/repository"
)

type TodoService struct {
	repository *repository.TodoRepository
}

func NewTodoService(repository *repository.TodoRepository) *TodoService {
	return &TodoService{
		repository: repository,
	}
}

func (service *TodoService) Save(createTodoDto dto.CreateTodoDto) (*dto.TodoDto, error) {
	todo, err := service.repository.Save(mapping.CreateTodoDtoToDomain(&createTodoDto))
	if err != nil {
		return nil, err
	}
	return mapping.ToTodoDto(todo), nil
}
