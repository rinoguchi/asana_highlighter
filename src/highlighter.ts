import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

function render() {
  const comments: NodeListOf<Element> = document.querySelectorAll(".RichText");
  comments.forEach((c) => {
    c.innerHTML = c.innerHTML.replace(
      /```(.*?)<br>(.*?)```/g,
      (_all: string, lang: string | undefined, src: string) => {
        const fixedSrc = src
          .replace(/<br>/g, "\n")
          .replace(/<code>|<\/code>/g, "")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&amp;/g, "&");

        let highlightedSrc;
        if (!lang) {
          highlightedSrc = hljs.highlightAuto(fixedSrc).value;
        } else {
          const fixedLang = lang.toLowerCase().trim();
          if (hljs.listLanguages().includes(fixedLang)) {
            highlightedSrc = hljs.highlight(fixedSrc, {
              language: lang.toLowerCase().trim(),
            }).value;
          } else {
            highlightedSrc = hljs.highlightAuto(fixedSrc).value;
          }
        }
        return `<pre><code class="hljs">${highlightedSrc}</code></pre>`;
      }
    );
  });
}

setInterval(render, 1000);
