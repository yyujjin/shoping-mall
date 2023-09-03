const addButtons = document.querySelectorAll(".add")
const ul = document.querySelector("ul")
const totalElement = document.querySelector("#total")
const list = [
    {
        name: "대창",
        price: 30000,
        amount: 10,
    },
]
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
        alert("장바구니에 담으시겠습니까?")
        // 사용방법: 요소.dataset.속성이름(data-빼고)
        // list.push(addButtons[i].value)
        const findmenu = list.findIndex(function (a) { //상수이름 변경 / list이름 변경 
            return a.name == addButtons[i].value
        })
        console.log(findmenu)
        if (findmenu == -1) { 
            list.push({
                name: addButtons[i].value,
                price: Number(addButtons[i].dataset.price),
                amount: 1,
                //자바는 "1" +"2" = 3으로 인식 못함. 문자자체로 인식해서 "12" 이렇게 나옴
                //이걸 숫자로 인식시켜 주는걸 nmber()
            })
        } else {
            list[findmenu].amount += 1
            // list[findmenu].price += list[findmenu].price
            // list[findmenu].price = list[findmenu].price + Number(addButtons[i].dataset.price)
            list[findmenu].price += Number(addButtons[i].dataset.price)
        }

        relist()
        console.log(list)
        // deleteButtons() relist에 딜리트가 포함되어있으니까
        //굳이 없어도 됨.
    })
}

relist()

function deleteButtons() {
    const deleteButtons = document.querySelectorAll(".deleteButtons")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            alert("삭제하시겠습니까?")
            list.splice(i, 1)
            relist()
        })
    }
}

function relist() {
    ul.innerHTML = ""
    let total = 0
    for (let i = 0; i < list.length; i++) {
        ul.innerHTML += `<li>${list[i].name} <span>${list[i].amount}</span>개 <span>${list[i].price}</span>원<button class="deleteButtons"> 삭제하기</button></li>`
        total = total + list[i].price
    }
    deleteButtons()
    totalElement.innerHTML = total
}