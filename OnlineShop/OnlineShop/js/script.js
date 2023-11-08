import {data} from "./phones.js"

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
                continue
            }
            good[property].forEach((item) => vals.add(item))
        }
        for (let val of vals) {
            result[property].push(htmlToElement(`<label class="filter-checkbox"><input type="checkbox" name="${property}" value="${val}">${val}</label>`))
        }
        result[property].sort((a, b) => { return a.firstChild.value.localeCompare(b.firstChild.value, undefined, {numeric: true, sensitivity: 'base'}) })
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
            let checked = true
            if (checkbox.firstChild.checked) {
                continue
            }
            checked = false
            filter[checkbox.firstChild.name].add(checkbox.firstChild.value)
            checkbox.firstChild.disabled = true
            for (let good of goods) {
                if (fitsFilter(filter, good) && good[checkbox.firstChild.name].includes(checkbox.firstChild.value)) {
                    checkbox.firstChild.disabled = false
                    break
                }
            }
            if (!checked)
                filter[checkbox.firstChild.name].delete(checkbox.firstChild.value)


            // checkbox.firstChild.disabled = true
            // let checked = true
            // if (!checkbox.firstChild.checked) {
            //     checked = false
            //     filter[checkbox.firstChild.name].add(checkbox.firstChild.value)
            // }
            // checkbox.firstChild.checked = false
            // for (let good of goods) {
            //     if (fitsFilter(filter, good) && good[checkbox.firstChild.name].includes(checkbox.firstChild.value)) {
            //         checkbox.firstChild.disabled = false
            //         if (checked)
            //             checkbox.firstChild.checked = true
            //         break
            //     }
            // }
            // if (!checked || checkbox.firstChild.disabled)
            //     filter[checkbox.firstChild.name].delete(checkbox.firstChild.value)


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
        if (checkBoxes[property].length == 0)
            continue
        let temp = htmlToElement(`<div class="category" name="${property}"><h2>${data.properties[property]}</h2><div class="checkboxes"></div></div>`)
        for (let checkbox of checkBoxes[property]) {
            temp.childNodes[1].appendChild(checkbox)
        }
        document.querySelector(selector).appendChild(temp)
    }
}

function updateFilters(selector, checkBoxes) {   
    let filterArea = document.querySelector(selector)
    for (let category of filterArea.childNodes) {
        let firstPart = []
        let secondPart = []
        let thirdPart = []
        for (let checkbox of checkBoxes[category.getAttribute('name')]) {
            checkbox.firstChild.disabled ? thirdPart.push(checkbox) : checkbox.firstChild.checked ? firstPart.push(checkbox) : secondPart.push(checkbox)
        }

        category.childNodes[1].innerHTML = ""
        firstPart.forEach((item) => category.childNodes[1].appendChild(item))
        secondPart.forEach((item) => category.childNodes[1].appendChild(item))
        thirdPart.forEach((item) => category.childNodes[1].appendChild(item))
    }
}

function printGoods(selector, arr) {
    document.querySelector(selector).innerHTML = ""
    for (let good of arr) {
        let output = htmlToElement(`
        <div class="good-card">
            <div class="image-part"><image src="${good.images}"></div>
            <div class="good-card--info"><h3>${good.name}</h3></div>
        </div>
        `)
        for (let property in data.properties) {
            if (!good.hasOwnProperty(property))
                continue
            output.childNodes[3].appendChild(htmlToElement(`
            <span><span class="info">${data.properties[property]}:</span> ${(good[property].join(", "))}</span>
            `))
        }
        document.querySelector(selector).appendChild(output)
    }
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