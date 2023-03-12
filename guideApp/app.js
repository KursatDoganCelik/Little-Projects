class Person{
  constructor(name,surname,email){
    this.name = name
    this.surname = surname
    this.email = email 
  }
}

class Utilization{
  static checkEmptySpace(...spaces){
    let result = true
    spaces.forEach(space => {
      if(space.length === 0){
        result = false
        return result
      }
    })
    return result
  }
}

class Selector{
  constructor(){
    this.name = document.querySelector("#name")
    this.surname = document.querySelector("#surname")
    this.email = document.querySelector("#email")
    this.save = document.querySelector("#save")
    this.form = document.querySelector(".form-guide").addEventListener("submit", this.saveAndUpdate.bind(this))
    this.personList = document.querySelector(".person-list")
    this.localStorage = new LocalStorage()
    this.showPerson()
  }

  showPerson(){
    this.localStorage.allPerson.forEach(person => {
      this.addPersonPage(person)
    })
  }

  addPersonPage(person){
    const createTr = document.createElement("tr")
    createTr.innerHTML = `<td>${person.name}</td><td>${person.surname}</td><td>${person.email}</td>
    <td><button class="btn btn-edit"><i class="fa-solid fa-edit"></i></button>
    <button class="btn btn-delete"><i class="fa-solid fa-trash"></i></button></td>`
    this.personList.appendChild(createTr)
  }

  saveAndUpdate(e){
    e.preventDefault()
    const person = new Person(this.name.value, this.surname.value, this.email.value)
    const result = Utilization.checkEmptySpace(person.name, person.surname, person.email)
      if(result){
        this.addPersonPage(person)
        this.localStorage.addPersonLocal(person)
      }
      else{
        console.log("alert");
      }
  }
}

class LocalStorage{
  constructor(){
    this.allPerson = this.getPerson()
  }

  getPerson(){
    let allPersonLocal = []
    if(localStorage.getItem("persons") !== null)
      allPersonLocal = JSON.parse(localStorage.getItem("persons"))
    return allPersonLocal
  }

  addPersonLocal(person){
    const allPersonLocal = this.getPerson()
    allPersonLocal.push(person)
    localStorage.setItem("persons",JSON.stringify(allPersonLocal))
  }

}

document.addEventListener("DOMContentLoaded", function(e){
  const selector = new Selector()
})
