//Ödev 1'in cevapları

let sureString = prompt('Bir süre giriniz')
let sure = parseInt(sureString)
dakika = parseInt((sure / 60), 10)
saniye = sure % 60


let F = prompt('F gir:')
let C = 5 / 9 * (F - 32)
console.log(C.toFixed(2))


let Yil = parseInt(prompt('Yıl gir:'))
artikYil = ((Yil % 400) == 0 || ((Yil % 4) == 0 && (Yil % 100) != 0))
// console.log("Girilen " + Yil + " yılı artık mı: " + artikYil)
console.log(`Girilen ${Yil} yılı artık mı: ${artikYil}`) // template literal

//Ödev 2'in cevapları
let sayi = Math.random() //Math.random()*100 de olur
sayi *= 100
sayi = sayi.toFixed(0)   // = Math.floor(sayi)
// console.log(sayi); oluşturlan sayıyı görmek için
let deger = prompt(`0 ile 100 arasında bir sayı gir.`)

//oluşturulan sayının birinci ve ikinci basamağı
let iB = sayi
iB %= 10

let bB = (sayi - iB) / 10
bB = bB.toFixed(0)
// console.log(`${bB} ${iB}`); oluşturulan sayının basamakları için

//alınan değerin birinci ve ikinci basamağı
let iB2 = deger
iB2 %= 10

let bB2 = (deger - iB2) / 10
bB2 = bB2.toFixed(0)
// console.log(`${bB2} ${iB2}`); alınan değerin basamakları için

// ödüllendirme (kontrol yapısı)
if (deger == sayi) {
    console.log(`Tebrikler sahte 10k kazandın`)
} else if ((bB == iB2) && (iB == bB2)) {
    console.log(`Yerleri yanlış ama 5k hocam. Üretilen sayı: ${sayi}`)
} else if ((bB == iB2) || (iB == bB2) || (iB == iB2) || (bB == bB2)) {
    console.log(`Tek sayı ama helal 1k. Üretilen sayı: ${sayi}`)
} else (
    console.log(`Salak -_- Üretilen sayı: ${sayi}`)
)

//Ödev 3'in cevapları
const sayilar = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const tekSayilarinKaresiniAlipOndanBuyukleriTopla = dizi => {
    const tekSayilar = dizi.filter(sayi => sayi % 2 == 1)
    console.log(tekSayilar)

    const tekSayilarinKaresi = tekSayilar.map(sayi => sayi * sayi)
    console.log(tekSayilarinKaresi)

    const ondanBuyukler = tekSayilarinKaresi.reduce((toplam, sayi) => {
        if (sayi > 10) { toplam += sayi }
        return toplam
    }, 0)
    console.log(ondanBuyukler)
}
tekSayilarinKaresiniAlipOndanBuyukleriTopla(sayilar)

//kısa versiyonunu yaparsak...
const kisaHali = dizi => {
    return dizi.filter(sayi => sayi % 2 == 1).map(sayi => sayi * sayi)
        .reduce((toplam, sayi) => sayi > 10 ? toplam += sayi : toplam, 0)
}; console.log(kisaHali(sayilar))

//Ödev 4'in cevapları
const sehirler = [
    { isim: "Adana", plaka: 01, komsular: ["Hatay", "Mersin"] },
    { isim: "Mersin", plaka: 33, komsular: ["Adana", "Antalya"] },
    { isim: "Ankara", plaka: 06, komsular: ["İstanbul", "İzmir"] },
]
sehirler.sort((f, s) => (f.isim > s.isim) ? 1 : (f.isim < s.isim ? -1 : 0)
    // if (f.isim > s.isim) {return 1}
    // else if (f.isim < s.isim) {return -1}
    // else {return 0}
); console.log(sehirler.reverse())

//

////güzel denemeydi ama reduce ile yapılamaz.
// let a = [0, 1]
// a.reduce((pre, cur) => {
//     if (pre < 100) {
//         pre += cur
//         a.push(pre)
//     } return pre
// }); console.log(a)

//let kontrol = parseInt(prompt('Lütfen kaça kadar fibanocci sayı yazılmasını istiyoranız giriniz :'))
let fibanocci = (control) => {
    let fibanocciDizisi = [0, 1]
    let a = 0
    for (let i = 0; ; i++) {
        a = fibanocciDizisi[i] + fibanocciDizisi[i + 1]
        if (a > control) { break }
        fibanocciDizisi.push(a)
    }
    alert(fibanocciDizisi)
    console.log(fibanocciDizisi)
}; //fibanocci(kontrol)

//

let ogrenciler = [
    { isim: "Kürşat Doğan", soyisim: "Çelik", id: 1 },
    { isim: "Sedat", soyisim: "Demir", id: 2 },
    { isim: "Alperen Kürşad", soyisim: "Gülbeyaz", id: 3 },
    { isim: "Kevser", soyisim: "Koç", id: 4 },
    { isim: "MehmetCan", soyisim: "Eraslan", id: 5 }]

console.log(ogrenciler.filter(ogrenci => ogrenci.id % 2 == 0)
    .map(ogrenci => `${ogrenci.isim} ${ogrenci.soyisim}`).sort())
