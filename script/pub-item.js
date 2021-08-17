/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function html_to_element(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


// a html code generator
/* 
------ generate:  ------

<details class="pub-item">
<summary class="pub-summary"> Rapid mixing of Glauber dynamics via spectral independence for all degrees
    <p class="coauthors">with <a>Weiming Feng</a>, <a>Yitong Yin</a> and <a>Xinyuan Zhang</a></p>
    <div class="pub-info">
    <div class="JC"> FOCS 2021 </div>
    <div class="pub-links">
        <a class="pub-link">arxiv</a>
        <a class="pub-link">PDF</a>
    </div>
    </div>
</summary>
<p class="pub-intro"> test </p>
</details>

------ from: ------

{
    title: "Rapid mixing of Glauber dynamics via spectral independence for all degrees",
    authors: [
        {name: "Weiming Feng", link: ""},
        {name: "Yitong Yin", link: ""},
        {name: "Xinyuan Zhang", link: ""}
    ],
    JC: {category: "C", name: "FOCS 2021"},
    links: [
        {name: "arxiv", link: ""},
        {name: "PDF", link: ""}
    ],
    intro: "test"
}

*/
function gen_pub_item(table) {
    template_item = `
      <details class="pub-item">
        <summary class="pub-summary"> ${table.title}
          <p class="coauthors"></p>
          <div class="pub-info">
            <div class="${table.JC.category}"> ${table.JC.name} </div>
            <div class="pub-links"> </div>
          </div>
        </summary>
        <p class="pub-intro"> ${table.intro} </p>
      </details> `;
    item = html_to_element(template_item);

    // add authors list
    authors = item.getElementsByClassName('coauthors')[0];
    for (let i = 0; i < table.authors.length; i++) {
        pre_text = '';
        if (i == 0) pre_text = "with ";
        else if (i == table.authors.length - 1) pre_text = " and ";
        else pre_text = ", ";
        authors.appendChild(document.createTextNode(pre_text));

        author = table.authors[i];
        template_author = `<a href="${author.link}">${author.name}</a>`;
        if (author.link == "") template_author = `<a>${author.name}</a>`;
        author_item = html_to_element(template_author);
        authors.appendChild(author_item);
    }

    // add links list
    links = item.getElementsByClassName('pub-links')[0];
    for (let i = 0; i < table.links.length; i++) {
        link = table.links[i];
        template_link = `<a class="pub-link" href="${link.link}">${link.name}</a>`;
        link_item = html_to_element(template_link);
        links.appendChild(link_item);
    }

    return item;
}

function add_pub(table) {
    item = gen_pub_item(table)
    target = document.getElementById('pub-target');
    target.appendChild(item);
}
