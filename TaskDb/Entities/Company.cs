namespace TaskDb
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        public string city { get; set; }
        public int zipCode { get; set; }
        public string phoneNumber { get; set; }
        public bool IsDeleted { get; set; }
        
    }
}