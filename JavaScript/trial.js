// Faktöriyel alan uygulama

/*let deger = parseInt(prompt(`Faktöriyelini alınmasını istediğin değeri gir.`))
let temp = deger-1

if(deger==0){
  alert(`Faktöriyel: 1`)
}else if(deger<0){
  alert(`Negatif sayı faktöriyeli alınmaz.`)
}else{
  for(temp;temp>1;temp--){
  deger *= temp
}
alert(`Faktöriyel: ${deger}`)
}*/

// Sayı tahmin oyunu

/*let sayi = Math.floor(Math.random() * 100)
// console.log(`${sayi}`)
let deger = parseInt(prompt(`Tahmin edilecek sayıyı giriniz. (0-100)`))
let counter = 1

while(deger != sayi){
  counter++
  if(deger < sayi){
    alert(`Acık arttır`)
  }else{
    alert(`Acık azalt`)
  }
  deger = parseInt(prompt())
}
alert(`Tebrikler doğru bildin. Tahmin sayın ${counter}`)*/

//dengeli parantezler reduce ile yapımı
/*let paranthesis
const parantezler = (metin) => {
  paranthesis = metin.split("")
}
parantezler("())")

let counter = paranthesis.reduce((prev, curr) => {
  if (curr == "(") {
    prev++
    console.log("İlk if çalıştı.")
    if (prev > 0) {
      console.log("Parantezler dengeli olabilir." + prev)
    }
  } else if (curr == ")") {
    prev--
    console.log("İkinci if çalıştı." + prev)
    if (prev < 0) {
      console.log("Parantezler dengesiz." + prev)
    }
  } else {
    console.log("Parantezler dengesizdir." + prev)
  }
  return prev
}, 0)
if (counter == 0) {
  console.log("Parantezler dengeli.")
} else {
  console.log("Parantezler dengesiz.")
}*/

//
