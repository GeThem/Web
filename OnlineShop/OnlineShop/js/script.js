import data from "./phones.json" assert { "type" : "json" }

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function getCheckboxes(arr) {
    let result = {}
    for (let property in data.properties) {
        result[property] = []
        let vals = new Set
        for (let good of arr) {
            if (!good.hasOwnProperty(property)) {
                good[property] = null
                continue
            }
            good[property].forEach((item) => vals.add(item))
        }
        for (let val of vals) {
            result[property].push(htmlToElement(`<label class="filter-checkbox"><input type="checkbox" name="${property}" value="${val}">${val}</label>`))
        }
        result[property].sort((a, b) => { return a.firstChild.value.localeCompare(b.firstChild.value) })
    }
    return result
}

function checkboxChanged(target, checkBoxes, filter, goods) {
    if (target.checked) {
        filter[target.name].add(target.value)
    } else {
        filter[target.name].delete(target.value)
    }

    for (let property of Object.keys(checkBoxes).sort((a, b) => { return a == target.name ? 1 : -1 })) {
        for (let checkbox of checkBoxes[property]) {
            // if (check_box.firstChild.checked)
            //     continue
            // filter[check_box.firstChild.name].add(check_box.firstChild.value)
            // check_box.firstChild.disabled = true
            // for (let good of goods) {
            //     if (fitsFilter(filter, good) && good[check_box.firstChild.name].includes(check_box.firstChild.value)) {
            //         check_box.firstChild.disabled = false
            //         break
            //     }
            // }
            // filter[check_box.firstChild.name].delete(check_box.firstChild.value)


            checkbox.firstChild.disabled = true
            let checked = true
            if (!checkbox.firstChild.checked) {
                checked = false
                filter[checkbox.firstChild.name].add(checkbox.firstChild.value)
            }
            checkbox.firstChild.checked = false
            for (let good of goods) {
                if (fitsFilter(filter, good) && good[checkbox.firstChild.name].includes(checkbox.firstChild.value)) {
                    checkbox.firstChild.disabled = false
                    if (checked)
                        checkbox.firstChild.checked = true
                    break
                }
            }
            if (!checked || checkbox.firstChild.disabled)
                filter[checkbox.firstChild.name].delete(checkbox.firstChild.value)


            if (checkbox.firstChild.disabled)
                checkbox.classList.add('disabled')
            else
                checkbox.classList.remove('disabled')
        }
    }
}

function fitsFilter(filter, item) {
    for (let category in filter) {
        if (filter[category].size == 0)
            continue
        if (item[category] == null) {
            return false
        }
        let hasOverlap = false
        for (let value of item[category]) {
            if (filter[category].has(value)) {
                hasOverlap = true
                break
            }
        }
        if (!hasOverlap)
            return false
    }
    return true
}

function printFilters(selector, checkBoxes) {
    for (let property in checkBoxes) {
        let firstPart = ''
        let secondPart = ''
        if (checkBoxes[property].length == 0)
            continue
        let temp = htmlToElement(`<div class="category" name="${property}"><h2>${data.properties[property]}</h2></div>`)
        for (let checkbox of checkBoxes[property]) {
            temp.appendChild(checkbox)
        }
        document.querySelector(selector).appendChild(temp)
    }
}

function updateFilters(selector, checkBoxes) {   
    let filterArea = document.querySelector(selector)
    for (let category of filterArea.childNodes) {
        let secondPart = []
        let firstPart = []
        for (let checkbox of checkBoxes[category.getAttribute('name')]) {
            firstChild.disabled ? secondPart.push(checkbox) : firstPart.push(checkbox)
        }
    
        category.childNodes.forEach((child) => { if (child.tagName !== 'H2') child.remove() })
        firstPart.forEach((item) => category.appendChild(item))
        secondPart.forEach((item) => category.appendChild(item))
    }
}

function printGoods(selector, arr) {
    let output = ''
    for (let good of arr) {
        output += `
        <div class="good-card">
            <span>${good.name}</span>
            <span>${good.genre}</span>
            <span>${good.year}</span>
            <span>${good.raiting}</span>
        </div>
        `
    }
    document.querySelector(selector).innerHTML = output
}

function filterGoods(currFilter, arr) {
    let result = []
    for (let good of arr) {
        if (fitsFilter(currFilter, good))
            result.push(good)
    }
    return result
}

$(document).ready(() => {
    const currentFilter = {}
    for (let property in data.properties) {
        currentFilter[property] = new Set()
    }

    let checkBoxes = getCheckboxes(data.data)
    printFilters('.filter-area', checkBoxes)
    printGoods('.goods-area', filterGoods(currentFilter, data.data))

    for (let property in checkBoxes) {
        checkBoxes[property].forEach((box) => {
            box.addEventListener("change", (e) => {
                checkboxChanged(e.target, checkBoxes, currentFilter, data.data)
                printGoods('.goods-area', filterGoods(currentFilter, data.data))
                updateFilters('.filter-area', checkBoxes)
            })
        })
    }

    window.onscroll = function () { myFunction() };

    let header = document.querySelector('.header-area')
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});