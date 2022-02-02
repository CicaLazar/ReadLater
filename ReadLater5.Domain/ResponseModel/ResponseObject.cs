namespace ReadLater5.Domain.ResponseModel
{
    public class ResponseObject
    {
        public string Message { get; set; }
        public bool Successful { get; set; }
        public object Data { get; set; }
    }
}
