let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  const list = document.getElementById("list");
  const balanceEl = document.getElementById("balance");

  list.innerHTML = "";

  let balance = 0;

  transactions.forEach((t, index) => {
    balance += t.amount;

    let li = document.createElement("li");
    li.className = t.amount > 0 ? "income" : "expense";

    li.innerHTML = `
      ${t.desc} ₹${t.amount}
      <button onclick="deleteTransaction(${index})">X</button>
    `;

    list.appendChild(li);
  });

  balanceEl.innerText = balance;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;

  if (desc === "" || amount === "") {
    alert("Please enter details");
    return;
  }

  transactions.push({
    desc: desc,
    amount: +amount
  });

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// Load data on start
updateUI();