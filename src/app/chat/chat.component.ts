import { NgFor, NgIf } from "@angular/common";
import {
  Component,
  ElementRef,
  signal,
  ViewChild,
  OnInit,
} from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { FormsModule } from "@angular/forms";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Ollama } from "ollama";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

type Message = {
  role: string;
  content: string;
  user: boolean;
  html: SafeHtml;
};

@Component({
  selector: "app-chat",
  imports: [NgFor, NgIf, FormsModule, SideBarComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css",
})
export class ChatComponent {
  @ViewChild("scrollTarget") scrollTarget!: ElementRef;

  currentUuid: string = "";
  prompt: string = "";
  history = signal<Message[]>([]);
  ollamaRes = signal<string>("");
  htmlOllamaRes = signal<SafeHtml>("");

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang, escaped }) => {
      const language = lang ? `language-${lang}` : "";
      return `
        <div class="flex w-full flex-col bg-[#262626] shadow-md rounded-xl my-2 text-[15px]">
          <div class="flex p-1 px-1.5 border-2 border-transparent border-b-[#404040] justify-between">
            <pre>${lang}</pre>
            <div class="flex flex-row gap-2">
              <button data-code-snippet class="p-1 px-1.5 rounded-lg hover:bg-[#24242424] z-10 cursor-pointer">Copy</button>
              <button data-code-preview class="p-1 px-1.5 rounded-lg hover:bg-[#24242424] z-10">Preview</button>
            </div>
          </div>
          <pre class="p-2 whitespace-pre-wrap"><code class="${language}">${text.trim()}</code></pre>
        </div>
      `;
    };

    marked.use(
      markedHighlight({
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      })
    );

    marked.setOptions({
      renderer: renderer,
    });

    document.addEventListener("click", (event: any) => {
      if (event.target.matches("[data-code-snippet]")) {
        const container = event.target.closest("div.flex.w-full.flex-col");
        const code = container ? container.querySelector("pre code") : null;
        if (code) {
          const codeText = code.innerText;
          navigator.clipboard.writeText(codeText);
        }
      }
    });

    this.route.paramMap.subscribe((params) => {
      this.currentUuid = params.get("id") ?? "";
      console.log("Chat: ", this.currentUuid);
    });
  }

  ollama = new Ollama({
    host: "http://localhost:11434",
  });

  async chat(event: any) {
    event.preventDefault();
    if (!this.prompt.trim()) return;
    this.history.update((prev) => [
      ...prev,
      { role: "user", content: this.prompt, user: true, html: "" },
    ]);
    this.prompt = "";
    setTimeout(() => {
      this.scrollTarget.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    const response = await this.ollama.chat({
      model: "gemma2:2b",
      messages: this.history(),
      stream: true,
    });
    let res = "";
    for await (let part of response) {
      this.ollamaRes.update((prev) => (prev += part.message.content));
      res += part.message.content;
      this.htmlOllamaRes.set(
        this.sanitizer.bypassSecurityTrustHtml(await marked(res))
      );
    }
    this.history.update((prev) => [
      ...prev,
      {
        role: "assistant",
        content: this.ollamaRes(),
        user: false,
        html: this.htmlOllamaRes(),
      },
    ]);
    this.htmlOllamaRes.set("");
    this.ollamaRes.set("");
  }
}
