function jawab(){
    var input = document.getElementById("isi").value.toLowerCase();
    console.log("pertanyaan awal",input)

      if (input.includes("#")) {
        // hapus semua tanda #
        let teksBersih = input.replace(/#/g, "").trim();
        mengubah(teksBersih, teksBersih);
        var jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = teksBersih;
        jawab.prepend(pesan); // tambahkan ke atas
        inputTeks.value = "";
    } else {
        // kirim ke pertanyaan
        pertanyaan(input);
        var jawab = document.getElementById("jawab");
        const pesan = document.createElement("div");
        pesan.className = "soal1";
        pesan.innerHTML = input;
        jawab.prepend(pesan); // tambahkan ke atas
        inputTeks.value = "";
        
    }
}

function mengubah(nama,input){
   var text= nama.toLowerCase().match(/ng|ny|[bcdfghjklmnpqrstvwxyz]?[aiueoé]|[bcdfghjklmnpqrstvwxyz]{1}|[\s]/gi);
   for (let i = 0; i < text.length - 1; i++) {
    if (text[i] === 'ny'& ["a","i","u","e","o","é"].includes(text[i+1])) {
        text[i] = text[i] + text[i + 1]; // Gabungkan ny + a
        text.splice(i + 1, 1);         // Hapus elemen berikutnya
    }
    else if (text[i] === 'ng' & ["a","i","u","e","o","é"].includes(text[i+1])) {
        text[i] = text[i] + text[i + 1]; // Gabungkan ny + a
        text.splice(i + 1, 1);         // Hapus elemen berikutnya
    }}

   console.log(text)
   aksara(text,input)

}
function aksara(nama, input){
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
    console.log({input},{hasil})
    hasil_aksara(hasil,input)
  })
}

function hasil_aksara(hasil, input){
    var jawab = document.getElementById("jawab");
    const pesan = document.createElement("div");
    pesan.className = "pesan";
    pesan.innerHTML = hasil;
    jawab.prepend(pesan); // tambahkan ke atas
    inputTeks.value = "";
}
function nilai(input){
    if (["apa", "kapan", "dimana", "siapa", "bagaimana"].includes(input)) return 3;
    if (["bahasa","kegunaan","fungsi","asal","usul","budaya","persebaran","sunda","wilayah","nilai","falsafah","alam","pakaian","adat","sejarah","nilai-nilai","ciri","khas","musik","tradisional","tokoh","terkenal","cerita","rakyat","rumah","panggung","tujuan","bahan","mainan","makanan","makna","aksara"].includes(input)) return 2;
    return 1;
}

function pertanyaan(input){
    console.log("masuk")
    fetch("artikel2.txt")
    .then(res => res.text())
    .then(teks => {
        let kata_tanya = input.match(/\w+/g); // ambil semua kata
        let kalimat = teks.split("|");
        console.log("pertanyaan pecah",kata_tanya)
        console.log(kalimat)
        var score = 0
        var score_akhir = 0
        for (var i = 0; i < kalimat.length; i++){
            console.log("cek",score_akhir)
            for(var j =0; j < kata_tanya.length; j++){
                if (kalimat[i].toLowerCase().includes(kata_tanya[j].toLowerCase())){
                    score += 1
                    score += nilai(kata_tanya[j])
                    console.log(kalimat[i],score )
                    
                }
            }
            if (score > score_akhir){
                score_akhir=score
                console.log("akhir",score_akhir)
                
                var jawaban_akhir = kalimat[i]
                jawaban_akhir= jawaban_akhir.replace(/;/g, "<br>");
                
            }
            else if (score_akhir == 0){
                jawaban_akhir="Saya tidak mengerti, tolong ulangi pertanyaan dengan benar"
            }
            
            score = 0
        }   
        bacakan(jawaban_akhir)
        console.log(jawaban_akhir)
        function bacakan(teks) {
            var bersih = teks.replace(/<br>/g, "")
            console.log(bersih)
            const speech = new SpeechSynthesisUtterance(bersih);
            speech.lang = 'id-ID'; // Bahasa Indonesia
            window.speechSynthesis.speak(speech);
            var wadah = document.getElementById("jawab");
            const pesan = document.createElement("div");
            pesan.className = "pesan";
            pesan.innerHTML = teks;
            wadah.prepend(pesan); // tambahkan ke atas
            inputTeks.value = "";
        }
    })
}
