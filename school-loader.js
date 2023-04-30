fetch("schools.json" + String(Date.parse(new Date()))).then(res => {
    if (res.status == 200) {
        return res.json();
    } else throw "加载学校列表失败！";
}).then(data => {
    let table = document.createElement("table");
    table.classList.add("table", "table-hover");
    let thead = document.createElement("thead");
    thead.innerHTML = `<tr><th scope="col" style="min-width: 170px;">学校名</th><th scope="col" style="min-width: 30px;">成立时间</th><th scope="col" style="min-width: 270px;">申请条件</th><th scope="col" style="min-width: 170px;">学校类型</th><th scope="col">网站</th></tr>`;
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    for (let i in data) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerHTML = i;
        th.scope = "row";
        tr.appendChild(th);
        for (let j in data[i]) {
            let td = document.createElement("td");
            if (!data[i][j]) data[i][j] = "-";
            td.innerHTML = data[i][j];
            tr.appendChild(td);
        }
        tbody.append(tr);
    }
    table.appendChild(tbody);
    document.getElementById("school-table").appendChild(table);
});
