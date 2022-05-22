import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css"; // 必要なcssを読み込み。css-loader+style-loaderで最終的に<style>タグとしてDOMに追加される

function render() {
  // コメントリストを取得
  const comments: NodeListOf<Element> = document.querySelectorAll(".RichText");
  comments.forEach((c) => {
    // 装飾のために挿入されているHTMLタグやHTML特殊文字がそのまま表示されないように置換
    const newInnerHTML = c.innerHTML.replace(
      /```(.*?)<br>(.*?)```/g,
      (_all: string, lang: string | undefined, src: string) => {
        const fixedSrc = src
          .replace(/<br>/g, "\n")
          .replace(/<[^<>]+>|<\/[^<>]+>/g, "") // htmlタグは全部置換
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&nbsp;/g, " ");

        let highlightedSrc;
        if (!lang) {
          // 言語が指定されてない場合は自動ハイライト
          highlightedSrc = hljs.highlightAuto(fixedSrc).value;
        } else {
          // サポートされている言語の場合は言語指定でハイライト
          const fixedLang = lang.toLowerCase().trim();
          if (hljs.listLanguages().includes(fixedLang)) {
            highlightedSrc = hljs.highlight(fixedSrc, {
              language: lang.toLowerCase().trim(),
            }).value;
          } else {
            // サポートされてない言語の場合は自動ハイライト
            highlightedSrc = hljs.highlightAuto(fixedSrc).value;
          }
        }
        // highlight.jsのスタイルに合わせてタグを追加
        return `<pre><code class="hljs">${highlightedSrc}</code></pre>`;
      }
    );
    // 変更がある場合は上記の内容でHTMLを置き換え
    if (newInnerHTML !== c.innerHTML) {
      c.innerHTML = newInnerHTML;
    }
  });
}

setInterval(render, 1000); // 1秒に1回上記の描画処理を実行
