package dto

type CreateTodoDto struct {
	Label       string `json:"label"`
	IsCompleted bool   `json:"isCompleted"`
}

func NewCreateTodoDto(label string, isCompleted bool) *CreateTodoDto {
	return &CreateTodoDto{
		Label:       label,
		IsCompleted: isCompleted,
	}
}
