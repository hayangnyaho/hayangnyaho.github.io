
function jawab(){
    var input = document.getElementById("isi").value.toLowerCase();
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
        var jawab = document.getElementById("jawab");
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
        var hasil = ""
        for (let i = 0; i < teksBersih.length; i++){
            var kar = teksBersih[i].toLowerCase();
            tr = data[kar] || kar
            hasil += tr
            hasil += " "
        }
        
        bacakan(hasil)
        })
        var jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = input;
        jawab.prepend(pesan); 
        inputTeks.value = "";
        console.log("pilihan 4")
    }
    else { // pillihan pertanyaan
        pertanyaan(input);
        var jawab = document.getElementById("jawab");
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
    var jawab = document.getElementById("jawab");
    const pesan = document.createElement("div");
    pesan.className = "pesan";
    pesan.innerHTML = hasil;
    jawab.prepend(pesan); // tambahkan ke atas
    inputTeks.value = "";
}
function nilai(input){ // memberi score untuk kata kunci
    if (["asal usul",
        "makanan",
        "masakan",
        "Wayang Golek",
        "Sandiwara Sunda",
        "Longser",
        "Reak",
        "Benjang",
        "Tembang Sunda dan Mamaos Cianjuran",
        "persebaran",
        "aksara",
        "Bahasa",
        "ciri khas",
        "seni tari",
        "tari Sunda",
        "Jawa Barat",
        "tari tradisional",
        "musik tradisional",
        "Kujang",
        "Golok",
        "Bandik",
        "gamelan",
        "kendang",
        "rebab",
        "gong",
        "kecapi",
        "tari Jaipongan",
        "Gugum Gumbira",
        "tari Merak",
        "tari Topeng",
        "tari Buyung",
        "tari Ketuk Tilu",
        "tari ronggeng",
        "nilai budaya",
        "tarian rakyat",
        "pelestarian budaya",
        "sanggar tari",
        "kesopanan",
        "gotong royong",
        "pencak silat",
        "upacara adat",
        "acara panen",
        "penyambutan tamu",
        "kostum tari",
        "karakter topeng",
        "festival budaya",
        "nilai tradisi",
        "generasi muda",
        "budaya Sunda",
        "warisan budaya",
        "macam macam",
        "fungsi",
        "nilai filosifis",
        "gunung",
        "kearifan lokal", "mainan", ].includes(input)) return 3;
    return 0;
}

function pertanyaan(input){ // mencari jawaban
    fetch("artikel2.txt")
    .then(res => res.text())
    .then(teks => {
        let kata_tanya = input.match(/\w+/g); // ambil semua kata
        let kalimat = teks.split("|");
        var score = 0
        var score_akhir = 0
        for (var i = 0; i < kalimat.length; i++){
            for(var j = 0; j < kata_tanya.length; j++){
                if (kalimat[i].toLowerCase().includes(kata_tanya[j].toLowerCase())){
                    score += 1  
                    var hasil=nilai(kata_tanya[j])
                    score += hasil
                }
            }
            if (score > score_akhir){
                score_akhir = score
                var jawaban = kalimat[i]
                var jawaban_akhir=jawaban.replace(/;/g, "<br>").trim();

            }
            else if(score_akhir <= 1){
                jawaban_akhir ="Maaf jawaban tidak ada atau pertanyaan yang anda ajukan kurang jelas, tolong tanyakan kembali!"
            } 
            score=0

        }  
        bacakan(jawaban_akhir)
        
    })
}
function bacakan(teks) { //menampilkan jawaban ke user dan membacakannya
    var bersih = teks.replace(/<br>/g, "")
    const speech = new SpeechSynthesisUtterance(bersih);
    speech.lang = 'id-ID'; // Bahasa Indonesia
    window.speechSynthesis.speak(speech);
    var wadah = document.getElementById("jawab");
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



