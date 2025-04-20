import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { PreviewStateService } from "../../preview.service";

@Component({
  selector: "app-html-preview",
  imports: [],
  templateUrl: "./html-preview.component.html",
  styleUrl: "./html-preview.component.css",
})
export class HtmlPreviewComponent {
  safeContent: string = "";

  constructor(
    private sanitizer: DomSanitizer,
    private previewState: PreviewStateService
  ) {}

  ngOnInit() {
    this.previewState.htmlToPreview$.subscribe((html) => {
      this.safeContent = this.santizeIt(html);
    });
  }

  closePreview() {
    this.previewState.setShowPreview(false);
  }

  private santizeIt(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html) as unknown as string;
  }
}
