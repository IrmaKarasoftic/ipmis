namespace TaskDb
{
    public class Item
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public bool IsDeleted { get; set; }
    }
}