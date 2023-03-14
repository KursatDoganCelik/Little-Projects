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

  static checkEmail(email){
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return re.test(String(email).toLowerCase())
  }
}

class Selector{
  constructor(){
    this.name = document.querySelector("#name")
    this.surname = document.querySelector("#surname")
    this.email = document.querySelector("#email")
    this.save = document.querySelector("#save")
    this.form = document.querySelector(".form-guide")
    this.form.addEventListener("submit", this.saveAndUpdate.bind(this))
    this.personList = document.querySelector(".person-list")
    this.personList.addEventListener("click" , this.updateOrDelete.bind(this))
    this.localStorage = new LocalStorage()
    //related tr element when clicked update or delete button
    this.clickedPersonTable = undefined
    this.showPerson()
  }

  showAlert(message, isSuccess){
    const alertDiv = document.querySelector(".info")
    alertDiv.innerHTML = message
    alertDiv.classList.add(isSuccess ? "info-success" : "info-error")

    setTimeout(() => {
      alertDiv.className = "info"
    }, 2500);
  }

  clearText(){
    this.name.value = ""
    this.surname.value = ""
    this.email.value = ""
  }

  updateOrDelete(e){
    const clickedPlace = e.target
    if(clickedPlace.classList.contains("btn-delete")){
      this.clickedPersonTable = clickedPlace.parentElement.parentElement
      this.deletePerson()
    }
    else if(clickedPlace.classList.contains("btn-edit")){
      this.clickedPersonTable = clickedPlace.parentElement.parentElement
      this.save.value = "Update"
      this.name.value = this.clickedPersonTable.cells[0].textContent
      this.surname.value = this.clickedPersonTable.cells[1].textContent
      this.email.value = this.clickedPersonTable.cells[2].textContent
      
    }
  }

  updatePerson(person){
    const result = this.localStorage.updatePersonLocal(person, this.clickedPersonTable.cells[2].textContent)
    if(result){
      this.clickedPersonTable.cells[0].textContent = person.name
      this.clickedPersonTable.cells[1].textContent = person.surname
      this.clickedPersonTable.cells[2].textContent = person.email

      this.clickedPersonTable = undefined  //default value
      this.save.value = "Save"
      return result
    }
    else {
      this.showAlert("Usage Email", false)
      return result
    }
  }

  deletePerson(){
    this.clickedPersonTable.remove()

    const deletedMail = this.clickedPersonTable.cells[2].textContent
    this.localStorage.deletePersonLocal(deletedMail)

    this.clickedPersonTable = undefined  //default value
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
    const checkEmpty = Utilization.checkEmptySpace(person.name, person.surname, person.email)
    const checkEmail = Utilization.checkEmail(this.email.value)
      if(checkEmpty){
        if(!checkEmail){
          this.showAlert("Wrong Email", false)
          return;
        }

        if(this.clickedPersonTable !== undefined){
          const result = this.updatePerson(person)
          if(result){
            this.showAlert("Updated", true)
            this.clearText()
          }
        }
        else{
          const result = this.localStorage.addPersonLocal(person)
          if(result){
            this.addPersonPage(person)
            this.localStorage.addPersonLocal(person)
            this.showAlert("Success", true)
            this.clearText()
          }
          else{
            this.showAlert("Usage Email", false)
          }
        }
      }
      else{
        this.showAlert("Empty Space", false)
      }
  }
}

class LocalStorage{
  constructor(){
    this.allPerson = this.getPerson()
  }

  isUniqueEmail(email){
    const result = this.allPerson.find(person => {
      return person.email === email
    })
    return (result ? false : true)
  
  }

  getPerson(){
    let allPersonLocal = []
    if(localStorage.getItem("persons") !== null)
      allPersonLocal = JSON.parse(localStorage.getItem("persons"))
    return allPersonLocal
  }
  
  addPersonLocal(person){

    if(this.isUniqueEmail(person.email)){
      this.allPerson.push(person)
      localStorage.setItem("persons",JSON.stringify(this.allPerson))
      return true
    }
    else return false
  }
 
  deletePersonLocal(email){
    this.allPerson.forEach((person, index) => {
      if(person.email === email)
        this.allPerson.splice(index, 1)
    })
    localStorage.setItem("persons",JSON.stringify(this.allPerson))
  }

  updatePersonLocal(updatePerson, email){
    if(updatePerson.email === email){
      this.allPerson.forEach((person, index) => {
        if(person.email === email)
        this.allPerson[index] = updatePerson
      })
      localStorage.setItem("persons", JSON.stringify(this.allPerson))
      return true
    }

    if(this.isUniqueEmail(updatePerson.email)){
      this.allPerson.forEach((person, index) => {
        if(person.email === email)
        this.allPerson[index] = updatePerson
      })
      localStorage.setItem("persons", JSON.stringify(this.allPerson))
      return true
    }
    else
      return false
  }
}

document.addEventListener("DOMContentLoaded", function(e){
  const selector = new Selector()
})
