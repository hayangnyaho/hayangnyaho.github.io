
function jawab(){
    let input = document.getElementById("isi").value.toLowerCase();
    console.log("pertanyaan awal",input)
    document.getElementById('isi').value = '';

    if (input.includes("#")) { //menentukan apkaha ini untuk ubah ke aksara
        let teksBersih = input.replace(/#/g, "").trim();
        mengubah(teksBersih, teksBersih);
        var jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = teksBersih;
        jawab.prepend(pesan);
        inputTeks.value = "";
        console.log("pilihan 1")
    }
    else if(!input){ // pilihan berhenti voice
        berhenti()
        console.log("pilihan 2")
    }
    // nanti dibuat
    // else if (input.includes("@")){
    //     let teksBersih = input.replace(/@/g, "").trim();
    //     latin(teksBersih);
    //     var jawab = document.getElementById("jawab");
    //     const pesan = document.createElement("div");
    //     pesan.className = "soal1";
    //     pesan.innerHTML = teksBersih;
    //     jawab.prepend(pesan);
    //     inputTeks.value = "";
    //     console.log("pilihan 3")
    // }

    else if(input.includes("1")){
        let teks = input.replace(/1/g, "").trim();
        let teksBersih = teks.match(/\w+/g);
        fetch('kamus.json')
        .then(response => response.json())
        .then(data => {
        var hasil = ""
        let kamusTerbalik = {};
        for (let key in data) {
            kamusTerbalik[data[key]] = key;
        }
        for (let i = 0; i < teksBersih.length; i++){
            var kar = teksBersih[i].toLowerCase();
            tr = kamusTerbalik[kar] || kar
            hasil += tr
            hasil += " "
        }
        
        bacakan(hasil)
        })
        let jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = input;
        jawab.prepend(pesan); 
        inputTeks.value = "";
        console.log("pilihan 3")
    }
    else if(input.includes("2")){
        let teks = input.replace(/2/g, "").trim();
        let teksBersih = teks.match(/\w+/g);
        fetch('kamus.json')
        .then(response => response.json())
        .then(data => {
        let hasil = ""
        for (let i = 0; i < teksBersih.length; i++){
            var kar = teksBersih[i].toLowerCase();
            tr = data[kar] || kar
            hasil += tr
            hasil += " "
        }
        
        bacakan(hasil)
        })
        let jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = input;
        jawab.prepend(pesan); 
        inputTeks.value = "";
        console.log("pilihan 4")
    }
    else { // pillihan pertanyaan
        pertanyaan(input);
        let jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = input;
        jawab.prepend(pesan); 
        inputTeks.value = "";
        console.log("pilihan 5")
        
    }
}

function mengubah(nama,input){ // menentuakan akhiran ng dan ny
   var text= nama.toLowerCase().match(/ng|ny|[bcdfghjklmnpqrstvwxyz]?[aiueoé]|[bcdfghjklmnpqrstvwxyz]{1}|[\s]/gi);
   for (let i = 0; i < text.length - 1; i++) {
    if (text[i] === 'ny'& ["a","i","u","e","o","é"].includes(text[i+1])) {
        text[i] = text[i] + text[i + 1]; 
        text.splice(i + 1, 1);       
    }
    else if (text[i] === 'ng' & ["a","i","u","e","o","é"].includes(text[i+1])) {
        text[i] = text[i] + text[i + 1]; 
        text.splice(i + 1, 1);       
    }}

   aksara(text,input)

}
function aksara(nama, input){// mengubah laten ke aksara
    fetch('latin_ke_aksara_sunda.json')
    .then(response => response.json())
    .then(data => {
    var hasil = ""
    for (let i = 0; i < nama.length; i++){
        const aks = data.find(item => item.kode === nama[i]);
        if (aks){
            hasil += aks.aksara
        }
            
        else{
            hasil += " "
        }
    }
    hasil_aksara(hasil)
  })
}


// fungsi mengubah aksara menjadi laten (nanti di buat)
// function latin(nama){
//     fetch('latin_ke_aksara_sunda.json')
//     .then(response => response.json())
//     .then(data => {

//         console.log(nama)
//     var hasil = ""
//     for (let i = 0; i < nama.length; i++){
//         const aks = data.find(item => item.aksara === nama[i]);
//         if (aks){
//             hasil += aks.kode
//         }
            
//         else{
//             hasil += " "
//         }
//     }
//     hasil_aksara(hasil)
//   })
// }

function hasil_aksara(hasil){ // menampilkan hasil ke user
    let jawab = document.getElementById("jawab");
    const pesan = document.createElement("div");
    pesan.className = "pesan";
    pesan.innerHTML = hasil;
    jawab.prepend(pesan); // tambahkan ke atas
    inputTeks.value = "";
}
function nilai(input){ // memberi score untuk kata kunci
    if (["asal usul",
        "suku",
        "aksara",
        "persebaran",
        "bahasa",
        "ciri",
        "khas",
        "sejarah",
        "kerajaan",
        "filosofi",
        "filsafah",
        "nilai",
        "lagu",
        "jenis",
        "rumah",
        "adat",
        "julang ngapak",
        "capit gunting",
        "buka pongpok",
        "Badak heuay",
        "tagog anjing",
        "mainan",
        "congklak",
        "egrang",
        "gasing",
        "dakon",
        "engklek",
        "sondah)",
        "oray-orayan",
        "bebentengan",
        "galah asin",
        "galasin",
        "kelereng",
        "alat",
        "musik",
        "angklung",
        "calung",
        "kecapi",
        "suling",
        "gendang",
        "tarawangsa",
        "rebab",
        "karinding",
        "celempung",
        "terebang",
        "masakan",
        "makanan",
        "nasi liwet",
        "nasi tutug oncom",
        "karedok",
        "lotek",
        "sayur asem",
        "lalapan",
        "sambal terasi",
        "pepes ikan",
        "gepuk",
        "bakakak hayam",
        "serabi",
        "cimplung",
        "gemblong",
        "macam",
        "makna",
        "pakaian",
        "senjata",
        "kujang",
        "golok",
        "bandik",
        "wayang golek",
        "longser",
        "sandiwara",
        "reak",
        "dogdog",
        "benjang",
        "tari",
        "topeng",
        "tembang",
        "mamaos",
        "seni",
        "pertunjukan",
        "tradisional",
        "jaipongan",
        "jaipong",
        "merak",
        "buyung",
        "ketuk tilu",
        "keurseus",
        "ronggeng gunung",
        "fungsi",
        "pelestarian",
        "gunung",
        "sistem",
        "pertanian",
        "huma",
        "sawah",
        "kebun"
    ].includes(input)) return 3;
    return 0;
}




function pertanyaan(input){ // mencari jawaban
    fetch("artikel2.txt")
    .then(res => res.text())
    .then(teks => {
        let kata_tanya = input.match(/\w+/g); // ambil semua kata
        let kalimat = teks.split("|");
        let score = 0
        let score_akhir = 0
        for (var i = 0; i < kalimat.length; i++){
            console.log(kalimat[i])
            for(var j = 0; j < kata_tanya.length; j++){
              
                if (kalimat[i].toLowerCase().includes(kata_tanya[j].toLowerCase())){
                    score += 1  
                    let hasil=nilai(kata_tanya[j])
                    score += hasil
                }
            }
            if (score > score_akhir){
                score_akhir = score
                let jawaban = kalimat[i]
                var jawaban_akhir=jawaban.replace(/;/g, "<br>").trim();

            }
            else if(score_akhir <= 1){
                jawaban_akhir ="Maaf jawaban tidak ada atau pertanyaan yang anda ajukan kurang jelas, tolong tanyakan kembali!"
            } 
            console.log(score)
            score=0

        }  
        bacakan(jawaban_akhir)
        
    })
}
function bacakan(teks) { //menampilkan jawaban ke user dan membacakannya
    let bersih = teks.replace(/<br>/g, "")
    const speech = new SpeechSynthesisUtterance(bersih);
    speech.lang = 'id-ID'; // Bahasa Indonesia
    window.speechSynthesis.speak(speech);
    let wadah = document.getElementById("jawab");
    const pesan = document.createElement("div");
    pesan.className = "pesan";
    pesan.innerHTML = teks;
    wadah.prepend(pesan); 
    inputTeks.value = "";       
     
}
function berhenti(){ // menghentikan voice
    window.speechSynthesis.cancel();
            console.log("🔇 Suara dihentikan");
}



