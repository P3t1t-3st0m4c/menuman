const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jourRegex = / [0-9]{1,2} /

const scrap_menu = async (url) => {
    const html = (await JSDOM.fromURL(url)).window.document
    const jour = new Date().getDate()
    let reponse = `le menu du jour a ${html.querySelector("title").textContent.trim()} est : \n\n`
    const slides = html.querySelectorAll(".slides > li")
    let menu = ""
    for (const slide of slides) {
        if (parseInt(slide.querySelector("h3").textContent.match(jourRegex)[0].trim()) == jour) {
            menu = slide
            break
        }
    }
    mydivs = menu.querySelectorAll(".liste-plats")
    if (mydivs.length == 0) return `y'a R, Le Crous c'est des gros chomeurs (Info supplémentaire : ${menu.querySelectorAll(".content-repas")[1].textContent.trim()})`
    for (const [i,div] of mydivs.entries()) {
        reponse += i == 0 ? "Entrée(s) :\n" : i == 1 ? "Plat(s) :\n" : "Dessert(s) :\n"
        title_element = mydivs[i].querySelectorAll("li")
        for (const element of title_element) {
            reponse += `     - ${element.textContent.trim()}\n`
        }
        reponse += "\n"
    }
    return reponse
}

module.exports = { scrap_menu : scrap_menu }


