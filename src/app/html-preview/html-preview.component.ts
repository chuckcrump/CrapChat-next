import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-html-preview",
  imports: [],
  templateUrl: "./html-preview.component.html",
  styleUrl: "./html-preview.component.css",
})
export class HtmlPreviewComponent {
  @Input() set html(val: string) {
    this.safeContent = this.santizeIt(val);
  }

  safeContent: string = "";

  constructor(private sanitizer: DomSanitizer) {
    console.log(this.safeContent);
  }

  private santizeIt(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html) as unknown as string;
  }
}
