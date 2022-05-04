import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

function render() {
  console.log("render called.");
  const comments: NodeListOf<Element> = document.querySelectorAll(
    ".TaskStoryFeed .BlockStoryStructure-block .TruncatedRichText .RichText"
  );
  comments.forEach((c) => {
    c.innerHTML = c.innerHTML.replace(
      /```(.*?)<br>(.*?)```/g,
      (all, lang, src) => {
        const adjustedSrc = src
          .replace(/<br>/g, "\n")
          .replace(/<code>|<\/code>/g, "")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&amp;/g, "&");

        let highlightedSrc;
        if (lang && hljs.listLanguages().includes(lang.toLowerCase().trim())) {
          highlightedSrc = hljs.highlight(adjustedSrc, {
            language: lang.toLowerCase().trim(),
          }).value;
        } else {
          highlightedSrc = hljs.highlightAuto(adjustedSrc).value;
        }
        return `<pre><code class="hljs">${highlightedSrc}</code></pre>`;
      }
    );
  });
}

render();
// setInterval(render, 3000);
