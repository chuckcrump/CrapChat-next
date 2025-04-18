import { NgFor } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-side-bar",
  imports: [NgFor],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
})
export class SideBarComponent {
  chats: any[] = [
    { name: "JOe" },
    { name: "JOe" },
    { name: "JOe" },
    { name: "JOe" },
    { name: "JOe" },
    { name: "JOe" },
  ];
}
