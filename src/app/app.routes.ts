import { Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { HtmlPreviewComponent } from "./html-preview/html-preview.component";

export const routes: Routes = [
  { path: "chat/:id", component: ChatComponent },
  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "" },
  { path: "preview", component: HtmlPreviewComponent },
];
