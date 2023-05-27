function open_school_list(){
    fetch("schools.json?" + String(Date.parse(new Date()))).then(res => {
        if (res.status == 200) {
            return res.json();
        } else throw "加载学校列表失败！";
    }).then(data => {
        let table = document.createElement("table");
        table.classList.add("table", "table-hover");
        let thead = document.createElement("thead");
        thead.innerHTML = `<tr><th scope="col"">学校名</th><th scope="col"">申请条件</th><th scope="col"">学校类型</th><th scope="col">受验</th></tr>`;
        table.appendChild(thead);
        let tbody = document.createElement("tbody");
        for (let i in data) {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML = i;
            th.scope = "row";
            tr.appendChild(th);
            for (let j in data[i]) {
                if (["task", "type"].includes(j)) {
                    let td = document.createElement("td");
                    if (!data[i][j]) data[i][j] = "-";
                    td.innerHTML = data[i][j];
                    tr.appendChild(td);
                }
            }
            let td = document.createElement("td");
            if (data[i]['questionnaire']!==undefined){
                td.innerHTML = " <span style='color: darkgreen;'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style='    fill: currentColor;'><path d=\"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z\"></path></svg></span>"
            }else{
                td.innerHTML = " <span style='color: red;'><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style='fill: currentColor;'><path d=\"M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z\"></path></svg></span>"
            }
            tr.appendChild(td)
            tbody.append(tr);
        }
        table.appendChild(tbody);
        document.getElementById("school-table").appendChild(table);
    });

}