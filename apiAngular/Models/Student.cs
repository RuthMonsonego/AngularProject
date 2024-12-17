using apiAngular.Models;

namespace apiAngular.Models
{
  public class Student
  {
    public int id { get; set; }
    public string lastName { get; set; }
    public string firstName { get; set; }
    public string phone { get; set; }
    public string address { get; set; }
    public int avg { get; set; }
    public string schoolYear { get; set; }
    public bool isActive { get; set; }
    public AcademicStatus academicStatus { get; set; }
    public absence[] absenteeismRecords
    { get; set; }

  }

  public enum AcademicStatus
  {
    FullTime = 1,
    PartTime = 2,
    OnLeave = 3

  }
}
