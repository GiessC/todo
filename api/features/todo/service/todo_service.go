package service

import (
	"api/features/todo/mapping"
	"api/features/todo/models/dto"
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

func (service *TodoService) FindAllByUser(userId string) ([]dto.TodoDto, error) {
	completeTodoList, completeTodoListErr := service.repository.FindAllByUserAndCompleted(userId, true)
	incompleteTodoList, incompleteTodoListErr := service.repository.FindAllByUserAndCompleted(userId, false)
	if completeTodoListErr != nil {
		return nil, completeTodoListErr
	}
	if incompleteTodoListErr != nil {
		return nil, incompleteTodoListErr
	}
	todoDtoList := make([]dto.TodoDto, len(completeTodoList)+len(incompleteTodoList))
	for i, todo := range completeTodoList {
		todoDtoList[i] = *mapping.ToTodoDto(&todo)
	}
	for i, todo := range incompleteTodoList {
		todoDtoList[i+len(completeTodoList)] = *mapping.ToTodoDto(&todo)
	}
	return todoDtoList, nil
}

func (service *TodoService) SetTodoCompleted(todoId string, completed bool) (*dto.TodoDto, error) {
	todo, err := service.repository.SetTodoCompleted(todoId, completed)
	if err != nil {
		return nil, err
	}
	return mapping.ToTodoDto(todo), nil
}

func (service *TodoService) Delete(todoId string) (*dto.TodoDto, error) {
	todo, err := service.repository.Delete(todoId)
	if err != nil {
		return nil, err
	}
	return mapping.ToTodoDto(todo), nil
}
