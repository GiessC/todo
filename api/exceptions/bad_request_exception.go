package exceptions

type BadRequestException struct {
	Message string
}

func (e BadRequestException) Error() string {
	return e.Message
}

func NewBadRequestException(message string) BadRequestException {
	return BadRequestException{
		Message: message,
	}
}
