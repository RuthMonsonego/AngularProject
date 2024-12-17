using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using apiAngular.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StudentsController : ControllerBase
  {
    public static List<Student> std = new List<Student>
        {
            new Student
            {
                id = 0,
                lastName = "cohen",
                firstName = "yael",
                address = "bb",
                phone = "0583248523",
                avg = 200,
                schoolYear = "B",
                isActive = true,
                academicStatus = AcademicStatus.FullTime,
                absenteeismRecords = new absence[] { new absence{ absenceStartDate = new DateTime(2023, 05, 05), absenteeismDays = 3 } }
            },  
            new Student
            {
                id = 1,
                lastName = "levi",
                firstName = "avi",
                address = "bb",
                phone = "0583248523",
                avg = 100,
                schoolYear = "B",
                isActive = true,
                academicStatus = AcademicStatus.FullTime,
                absenteeismRecords = new absence[] { new absence{ absenceStartDate = new DateTime(2024, 05, 05), absenteeismDays = 2 } }
            }
        };

    // GET: api/<ValuesController>
    [HttpGet]
    public IEnumerable<Student> Get()
    {
      return std;
    }

    // GET api/<ValuesController>/5
    [HttpGet("{id}")]
    public Student Get(int id)
    {
      return std.FirstOrDefault(student => student.id == id);

    }

    [HttpGet("filterByName/{name}")]
    public IEnumerable<Student> GetByName(string name= "")
    {
      if (string.IsNullOrEmpty(name))
      {
        return Enumerable.Empty<Student>();
      }

      return std.Where(s => s.lastName.Contains(name));
    }

    // POST api/<ValuesController>
    [HttpPost]
    public bool Post([FromBody] Student s)
    {
      if (s == null)
      {
        return false;
      }
      std.Add(s);
      return true;
    }

    // PUT api/<ValuesController>/5
    [HttpPut("{id}")]
    public bool Put(int id, [FromBody] Student s)
    {
      var student = std.FirstOrDefault(st => st.id == id);
      if (student != null)
      {
        student.firstName = s.firstName;
        student.lastName = s.lastName;
        student.address = s.address;
        student.phone = s.phone;
        student.avg = s.avg;
        student.schoolYear = s.schoolYear;
        student.isActive = s.isActive;
        student.absenteeismRecords = s.absenteeismRecords;
        student.academicStatus = s.academicStatus;
        return true;
      }
      return false;
    }

    // DELETE api/<ValuesController>/5
    [HttpDelete("{id}")]
    public bool Delete(int id)
    {
      Student s = std.Find(x => x.id == id);
      if (s != null)
      {
        std.Remove(s);
        return true;
      }
      return false;
    }
  }
}
