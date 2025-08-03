const boxLeft = document.getElementById('aa')
const boxCenter = document.getElementById('ab')
const boxRight = document.getElementById('ac')
const boxBtn = document.getElementById('btn1')
const listButton = document.getElementById('boxs')
const input = document.getElementById('input1')
const resultPool = document.getElementById('resultpool')
const animeRangi = document.getElementById('rangi')
const resultbox = document.getElementById('showmatn')
var timer2;

let savedMoney = localStorage.getItem("pool");
if (savedMoney) {
    mony2 = Number(savedMoney);
    resultPool.innerHTML = mony2;
}

const randomItem = ["🍒","🍉","🌽","🔔", 7]
var mony ;
var mony2 = Number(resultPool.innerHTML)

function getItem(){
    return randomItem[Math.floor(Math.random()*randomItem.length)]
}
function spin(vorodi ,zaman){
    const a = setInterval(()=>{
        vorodi.innerHTML = getItem()
    },50)
    setTimeout(()=>{
        clearInterval(a)
    },zaman)
}
boxBtn.addEventListener("click",()=>{
    resultbox.textContent = ""
    mony = Number(input.value)
    if(mony <= mony2 && mony != 0 && mony > 0){
        animeRangi.style.display = "block"
        spin(boxLeft,1000)
        spin(boxCenter,2000)
        spin(boxRight,3000)
        setTimeout(scan,3000)
        boxBtn.style.visibility = "hidden"
        if(timer2){
            clearTimeout(timer2)
        }
        timer2 = setTimeout(()=>{
            resultbox.textContent = ""
            boxLeft.innerHTML = "🍒"
            boxCenter.innerHTML = "🍒"
            boxRight.innerHTML = "🍒"
        },10000)
    }else{
        alert(" لطفا فیلد را پر کنید !")
    }
})
listButton.addEventListener("click",(aa)=>{
    mony = Number(input.value)
    if(aa.target.innerText == -5) mony -= 5
    else if(aa.target.innerText == -10) mony -= 10
    else if(aa.target.innerText == -100) mony -= 100
    else if(aa.target.innerText == +5) mony += 5
    else if(aa.target.innerText == +10) mony += 10
    else if(aa.target.innerText == +100) mony += 100
    else if(aa.target.innerText == "Reset"){
        mony2 = 1000
        localStorage.setItem("pool", mony2);
        resultPool.innerHTML = 1000


    }
    input.value = mony
})
function isTriple(a,b,c,values){
    return a === values && b === values && c === values;
}

function isSemiWin(a,b,c,values){
    return values.includes(a)&& values.includes(b) && values.includes(c) && !(a == b && b == c)
}

function scan (){
    var b1 = boxLeft.innerText
    var b2 = boxCenter.innerText
    var b3 = boxRight.innerText

    if(isTriple(b1,b2,b3,"🍒") || isTriple(b1,b2,b3,"🍉") || isTriple(b1,b2,b3,"🌽")){
        mony2 += mony*10
        resultbox.style.animation = "fadeIn 0,5s"
        resultbox.textContent = "Triple 🍒 🍒 🍒 x10"
        
    }else if(isTriple(b1,b2,b3,"🔔")){
        mony2 += mony*25
        resultbox.textContent = "Triple 🔔 🔔 🔔 x25"
        
    }else if(isTriple(b1,b2,b3,7)){
        mony2 += mony*100
        resultbox.textContent = "Triple  7 7 7 x100"
        
    }else if(isSemiWin(b1,b2,b3,["🍉","🍒","🌽"])){
        mony2 += mony*2
        resultbox.textContent = "🍒 🍒 🍒 x2"
    }else{
        mony2 -= mony
        resultbox.textContent = `Lose 😭 -${mony}$`
    }
    resultPool.innerHTML = mony2
    boxBtn.style.visibility = ""
    animeRangi.style.display = "none"
    localStorage.setItem("pool", mony2);
}
