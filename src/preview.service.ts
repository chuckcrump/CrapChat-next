import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PreviewStateService {
  private _showPreview = new BehaviorSubject<boolean>(false);
  showPreview$ = this._showPreview.asObservable();

  private _htmlToPreview = new BehaviorSubject<string>("");
  htmlToPreview$ = this._htmlToPreview.asObservable();

  setShowPreview(status: boolean) {
    this._showPreview.next(status);
  }

  setHtmlToPreview(html: string) {
    this._htmlToPreview.next(html);
  }
}
