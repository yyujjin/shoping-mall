const addButtons = document.querySelectorAll(".add")
const ul = document.querySelector("ul")
const list = [
    {
        name: "대창",
        price: 30000,
    },
]
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
        alert("장바구니에 담으시겠습니까?")
        // 사용방법: 요소.dataset.속성이름(data-빼고)
        // list.push(addButtons[i].value)
        list.push(
            {
                name : addButtons[i].value,
                price : addButtons[i].dataset.price
            }
        )

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
    for (let i = 0; i < list.length; i++) {
        ul.innerHTML += `<li>${list[i].name}<span>${list[i].price}</span>원<button class="deleteButtons"> 삭제하기</button></li>`
    }
    deleteButtons()
}
