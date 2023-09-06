const addButtons = document.querySelectorAll(".add")
const ul = document.querySelector("ul")
const totalElement = document.querySelector("#total")
const BASE_URL = "http://localhost:3000/cart"
let list = [
    //에러나서 const->let으로 바꿔줌.
    {
        id: 0,
        name: "대창",
        price: 30000,
        amount: 10,
    },
]

for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", async function () {
        alert("장바구니에 담으시겠습니까?")
        const findmenu = list.findIndex(function (a) {
            //상수이름 변경 / list이름 변경
            return a.name == addButtons[i].value
            //!조건이 충족한다면 그 인덱스를 보내라.
        })
        console.log(findmenu)
        if (findmenu == -1) {
            const id = Number(addButtons[i].dataset.id)
            const name = addButtons[i].value
            const price = Number(addButtons[i].dataset.price)
            list.push({
                id: id,
                name: name,
                price: price,
                amount: 1,
            })
            //post라우트 연결
            const add = {
                id: id,
                name: name,
                price: price,
                amount: 1,
            }
            const jsonAdd = JSON.stringify(add)

            await fetch(
                `http://localhost:3000/cart`,

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: jsonAdd, // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
                }
            )
        } else {
            //수정 라우트 모르겠음
            list[findmenu].amount += 1

            list[findmenu].price += Number(addButtons[i].dataset.price)
            // 쿼리스트링 방식으로 body로 바꾸기!
            const amount = list[findmenu].amount
            const price = list[findmenu].price
            const id = Number(list[findmenu].id)
            // await fetch(
            //     `http://localhost:3000/cart?amount=${list[findmenu].amount}
            // &price=${list[findmenu].price}
            // &id=${Number(list[findmenu].id)}`,
            //     {
            //         method: "PATCH",
            //     }
            // )
            const modify = {
                amount: amount,
                price: price,
                id: id,
            }
            const jsonModify = JSON.stringify(modify)
            await fetch(
                `http://localhost:3000/cart`,

                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonModify,
                }
            )
        }
        relist()
        console.log(list)
    })
}

relist()

function deleteButtons() {
    const deleteButtons = document.querySelectorAll(".deleteButtons")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", async function () {
            alert("삭제하시겠습니까?")
            //delete 라우트 연결
            await fetch(`http://localhost:3000/cart?id=${list[i].id}`, {
                method: "DELETE",
            })
            list.splice(i, 1)
            relist()
        })
    }
}

async function relist() {
    //get 라우트 연결
    const res = await fetch(`${BASE_URL}`)
    const data = await res.json()
    list = data
    ul.innerHTML = ""
    let total = 0
    for (let i = 0; i < list.length; i++) {
        ul.innerHTML += `<li>${list[i].name} <span>${list[i].amount}</span>개 <span>${list[i].price}</span>원<button class="deleteButtons"> 삭제하기</button></li>`
        total = total + list[i].price
    }
    deleteButtons()
    totalElement.innerHTML = total
}
